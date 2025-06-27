import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendTeamWelcomeEmail = async (
    to: string,
    tempPassword: string,
    companyName: string
) => {
    const mailOptions = {
        from: `"ProductTrack" <${process.env.EMAIL_USER}>`,
        to,
        subject: '¡Te han creado una cuenta en ProductTrack!',
        html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
        <h2 style="color: #800020;">¡Bienvenido a ProductTrack!</h2>
        <p>Tu empresa <strong>${companyName}</strong> ha creado una cuenta para ti.</p>
        <p>Estos son tus datos de acceso:</p>
        <ul>
          <li><strong>Correo:</strong> ${to}</li>
          <li><strong>Contraseña temporal:</strong> ${tempPassword}</li>
        </ul>
        <p>Por favor inicia sesión para completar tu perfil y comenzar a usar nuestros servicios.</p>
        <br />
        <a href="https://producttrack.com/login" style="background-color: #800020; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Iniciar sesión</a>
        <p style="font-size: 12px; color: gray; margin-top: 10px;">
            *Este enlace estará disponible cuando se despliegue la aplicación.
        </p>
        </div>
    `,
    };

    await transporter.sendMail(mailOptions);
};
