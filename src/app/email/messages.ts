export class EmailMessage {
    id: string;
    title: string;
    message: string;
}

export class ClientEmail {
    email: string;
    message: string;
    fullname: string;
    subject: string;
}

export class SmsMessage {
    message: string;
    mobile: string;
    fullname: string;
}

