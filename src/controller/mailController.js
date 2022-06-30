const mailService = require('../service/mailService')


module.exports.getMailService = async function(req, res) {
  try {
    const message = mailService.sendActivationMail(req.body, req.files);
    res.status(200).json(message)
  } catch (e){
    res.status(401).json({message: e})
  }
}