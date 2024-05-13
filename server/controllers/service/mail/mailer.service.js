const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: 'smpt.mail.ru',
    port: '465',
    secure: true,
    auth: {
        user: 'test_klyueva_04@mail.ru',
        pass: 'efc0uf7gRUpZDtzh5B8q',
    }
}, {
    from: 'Test App <test_klyueva_04@mail.ru>'
})

sendTestMail = (email) => {
    transporter.sendMail({
        to: email,
        subject: 'Регистрация прошла успешно',
        text: `Привет, ${email}! Спасибо за регистрацию на нашем сайте.`,
        html: `<h1>Поздравляем🥳</h1>
        <h2>Регистрация прошла успешно!</h2>
    <i>Здравствуйте, ${email}</i>
    <p>Всё прошло успешно</p>`
    }).then(() => console.info("Письмо успешно отправлено на адрес: ",
        email))
        .catch(err => console.warn("Произошла ошибка при отправке сообщения:    ", err))
}


const MailService = {
    sendTestMail: sendTestMail
}
module.exports = MailService;