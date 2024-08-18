export const zblConfig = {
    "identifier": "ZBL",
    "name": "Zibal payment gateway",
    "auth_key": "zibal",
    "paymentRequest": {
        "url": "https://gateway.zibal.ir/request/lazy",
        "method": "POST",
        "param_type": "BODY",
        "auth": {
            "type": "BODY",
            "key": "merchant"
        },
        "params": {
            "amount": "amount",
            "callbackUrl": "callbackUrl",
            "description": "description",
            "orderId": "orderId",
            "mobile": "mobile",
            "email": ""
        },
        "response": {
            "link": "",
            "trackId": "trackId",
            "status": "result",
            "message": "message"
        }

    },
    "startPay": {
        "url": "https://gateway.zibal.ir/start",
        "method": "GET",
        "param_type": "PARAM",
        "params": {
            "trackId": "trackId"
        },
        "response": {
            "status": "status",
            "trackId": "trackId",
            "orderId": "orderId",
            "cardNumber": "cardNumber",
            "hashedCardNumber": "hashedCardNumber"
        }
    },
    "verifyPayment": {
        "url": "https://gateway.zibal.ir/verify",
        "method": "POST",
        "param_type": "BODY",
        "auth": {
            "type": "BODY",
            "key": "merchant"
        },
        "params": {
            "trackId": "trackId",
            "orderId": ""
        },
        "response": {
            "paidAt": "paidAt",
            "status": "status"
        }
    },
    "status": {
        "-2": "false",
        "-1": "-",
        "1": "true",
        "2": "true",
        "3": "1",
        "4": "false",
        "5": "false",
        "6": "false",
        "7": "false",
        "8": "false",
        "9": "false",
        "10": "false",
        "11": "false",
        "12": "false",
        "100" : "true",
        "102" : "false",
        "103" : "false",
        "104" : "403",
        "105" : "false",
        "106" : "false",
        "113" : "false",
    },
    
}
export const idpConfig = {
    "identifier": "IDP",
    "auth_key": "6a7f99eb-7c20-4412-a972-6dfb7cd253a4",
    "name": "Idpay payment gateway",
    "paymentRequest": {
        "url": "https://api.idpay.ir/v1.1/payment",
        "method": "POST",
        "param_type": "BODY",
        "auth": {
            "type": "HEADER",
            "key": "X-API-KEY"

        },
        "params": {
            "amount": "amount",
            "callbackUrl": "callback",
            "description": "desc",
            "orderId": "order_id",
            "mobile": "phone",
            "email": "mail"
        },
        "response": {
            "link": "link",
            "trackId": "id",
            "status": "",
            "message": ""
        }
    },
    "startPay": {
        "url": "https://gateway.zibal.ir/start",
        "method": "GET",
        "param_type": "PARAM",
        "params": {
            "trackId": "trackId"
        },
        "response": {
            "status": "status",
            "trackId": "track_id",
            "orderId": "order_id",
            "cardNumber": "card_no",
            "hashedCardNumber": "hashed_card_no"
        }
    },
    "verifyPayment": {
        "url": "https://api.idpay.ir/v1.1/payment/verify",
        "method": "POST",
        "param_type": "BODY",
        "auth": {
            "type": "HEADER",
            "key": "X-API-KEY"
        },
        "params": {
            "trackId": "id",
            "orderId": "order_id"
        },
        "response": {
            "paidAt": "date",
            "status": "status"
        }
    },
    "status": {
        "1": "false",
        "2": "false",
        "3": "false",
        "4": "false",
        "5": "false",
        "6": "false",
        "7": "false",
        "8": "false",
        "10": "-",
        "100": "true",
        "101": "true",
        "200": "true", 
        "-1": "false",
        "11": "false",
        "12": "false",
        "13": "false",
        "15": "false",
        "21": "false",
        "22": "false",
        "23": "false",
        "24": "false",
        "31": "false",
        "32": "false",
        "33": "false",
        "34": "false",
        "35": "false",
        "36": "false",
        "37": "false",
        "38": "false",
        "39": "false",
        "41": "false",
        "42": "false",
        "43": "false",
        "44": "false",
        "51": "false",
        "52": "false",
        "53": "false",
        "54": "false",
         
    }
}