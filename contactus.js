const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use(cors());

// POST endpoint to handle form submissions
app.post('/submit-form', async (req, res) => {
    const { name, email, budget, timeframe, projectDescription } = req.body;

    // Create a SMTP transporter
    let transporter = nodemailer.createTransport({
        service:"Gmail",
        auth: {
            user: 'abdullah2207e@gmail.com',
            pass: 'neomwysrpxfemjum'
        }
    });

    // Mail options
    const mailOptions = {
        from: 'New Application for work <abdullah2207e@gmail.com>',
        to: 'abdullah2207e@gmail.com',
        subject: 'New Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nBudget: ${budget}\nTimeframe: ${timeframe}\nProject Description: ${projectDescription}`
    };

    try {
        // Send mail
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.send('Form submitted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});

app.get("/", (req, res) => {  
    res.send("hello world");
    console.log("resp send successfuly")
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
