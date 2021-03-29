const nodemailer = require('nodemailer')
const pug = require('pug')
const juice = require('juice')
const htmlToText = require('html-to-text')

const emailConfig = require('../config/email')


let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.password
    }
});

//generar html
const generarHtml = (archivo, opciones = {}) => {
    const html = pug.renderFile(`${__dirname}/../views/emails/${archivo}.pug`, opciones);
    return juice(html);
}

exports.enviar = async(opciones) => {
    const html = generarHtml(opciones.archivo, opciones);
    const text = htmlToText.fromString(html);
    let info = {
        from: 'UpTaskNode<no-reply@utn.com>',
        to: opciones.usuario.email,
        subject: opciones.subject,
        text,
        html
    };
    await transport.sendMail(info);
}




