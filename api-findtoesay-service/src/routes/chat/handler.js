const ChatModel = require("../../db/chat.model");
const classifiedModel = require("../../db/classified.model");
const userModel = require("../../db/user.model");

const chatInit = async (req, res) => {
  const { adsId, adsOwner } = req.body;
  const userId = req.userData._id;
  let addTitle = "";
  let adsOwnerName = "";
  let userName = "";
  await Promise.allSettled([classifiedModel.get(adsId), userModel.getUser(adsOwner), userModel.getUser(userId)])
    .then(resArr => {
      addTitle = resArr[0]?.value?.title || "";
      adsOwnerName = resArr[1]?.value?.username || "";
      userName = resArr[2]?.value?.username || "";
    }).catch(err => console.log(err));


  ChatModel.findChat(adsId, userId)
    .then(chatData => {
      if (chatData) {
        res.status(200).send({ msg: "Success", data: chatData });
      } else {
        ChatModel.init({ adsId, addTitle, adsOwner, adsOwnerName, userId, userName, messages: [] })
          .then(data => {
            ChatModel.chatHistory(data.insertedId)
              .then((chatHistory) => {
                return res.status(200).send({ msg: "Success", data: chatHistory });
              })
              .catch((err) => {
                console.log(err);
                return res.status(501).send({ msg: "Fail", error: JSON.stringify(err) });
              });
          }).catch(err => {
            res.status(501).send({ msg: "Fail", error: JSON.stringify(err) });
          });
      }
    }).catch(err => {
      res.status(501).send({ msg: "Fail", error: JSON.stringify(err) });
    });
}

const sendMsg = (req, res) => {
  const { chatId, message } = req.body;
  const userId = req.userData._id;
  ChatModel.pushChat(chatId, message, userId)
    .then((chatRes) => {
      res.status(200).send({ msg: "Success", data: chatRes });
    })
    .catch((err) => {
      console.log(err);
      res.status(501).send({ msg: "Fail", error: JSON.stringify(err) });
    });

}

const chatMessages = (req, res) => {
  const { id } = req.params;
  const userId = req.userData._id;
  ChatModel.chatHistory(id)
    .then((chatRes) => {
      if (chatRes?.userId == userId || chatRes?.adsOwner == userId) {
        return res.status(200).send({ msg: "Success", data: chatRes });
      }
      return res.status(403).send();
    })
    .catch((err) => {
      console.log(err);
      return res.status(501).send({ msg: "Fail", error: JSON.stringify(err) });
    });
}


const userChats = (req, res) => {
  const userId = req.userData._id;
  ChatModel.userChats(userId)
    .then((chatRes) => {
      res.status(200).send({ msg: "Success", data: chatRes });
    })
    .catch((err) => {
      console.log(err);
      res.status(501).send({ msg: "Fail", error: JSON.stringify(err) });
    });

}

module.exports = {
  chatInit,
  sendMsg,
  chatMessages,
  userChats
}