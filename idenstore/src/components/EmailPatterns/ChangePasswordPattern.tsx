export const getChangePasswordPattern = (info: any) => {
    return `<!DOCTYPE html>
            <html>
                <head>
                    <title>Восстановление пароля</title>
                    <style>
                        .pattern {
                            background-color: white;
                            border-radius: 25px;
                        
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            gap: 25px;
                        
                            margin-top: 50px;
                            padding: 50px;
                        }
                        
                        .bg{
                            background: #FFF;
                            width: 100%;
                            padding: 40px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        }

                        .bg h1{
                            width: 400px;
                        }

                        .button{
                            width: 100%;
                            padding: 15px 0;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background: #02121C;
                            color: #FFF;
                            border-radius: 8px;
                            font-size: 16px;
                            font-weight: 600;
                            transition: all 0.5s;
                            margin-top: 20px;
                            cursor: pointer;
                        }

                        .list{
                            width: 400px;
                        }
                    
                    </style>
                </head>
                <body>
                    <section class="pattern">
                        <div class="bg">
                            <h1>Заказ #${info.order} оформлен!</h1>

                            <div class="list">
                                <p><b>Имя:</b> <span>${info.name}</span></p>
                                <p><b>Фамилия:</b> <span>${info.surname}</span></p>
                                <p><b>Отчество:</b> <span>${info.patronymic}</span></p>
                                <p><b>Номер телефона:</b> <span>${info.surname}</span></p>
                                <p><b>Почта:</b> <span>${info.phone}</span></p>
                                <a href="${process.env.URL}/order/${info.order}" class="button">Подробнее о заказе</a>
                            </div>
                        </div>
                    </section>
                </body>
            </html>
            `;
};
