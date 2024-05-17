"use server"
import axios from "axios";
import { formSchema } from "@/lib/schema";
import { date, z } from "zod";
import { headers } from "next/headers";

//Using the fillForm action to fill the form

export const sendNotification = async (form: z.infer<typeof formSchema>) => {
    try {
        console.log(form);
        // const URL = "https://hooks.zapier.com/hooks/catch/18897236/3v6l2xv/"
        // const response = await axios.post(URL, form);
        //Sample setTimeout to simulate a server request
        let data = JSON.stringify({
            "from": {
                "email": "MS_G4vOOD@trial-z86org8o5yk4ew13.mlsender.net"
            },
            "to": [
                {
                    "email": `${process.env.MY_EMAIL}`,
                    "name": "PlatinumJ.dev"
                }
            ],
            "subject": "New Form Submission on PlatinumJ.dev",
            "text": `Name: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`,
            "html": `<p>Name: ${form.name}</p><p>Email: ${form.email}</p><p>Message: ${form.message}</p>`
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.mailersend.com/v1/email',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': `Bearer ${process.env.MAILERSEND_API_KEY}`
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

        //await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
            message: "Form submitted successfully",
            success: true
        }
    } catch (error) {
        return {
            message: "An error occurred while submitting the form",
            success: false
        }
    }
};