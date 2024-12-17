module.exports = {
    templateWithoutCred: `
    <body style="margin: 0;padding: 20px;box-sizing: border-box;font-family: 'DM Sans', sans-serif;background-color: #fff;">
    <section
        style="width: 100%;max-width: 500px;padding: 0;box-sizing: border-box;margin: auto;background-color: #fff;border-radius: 8px;display: flex;height: calc(100vh - 40px);align-items: center;justify-content: center;">
        <table style="width: 100%;border: 1px solid #004180;
        border-spacing: 0;
        border-radius: 15px;
        margin: 0;
        padding: 0;">
            <tr>
                <td style="text-align: center;padding: 0;">
                    <div class="logo_header"
                        style="background-color: #004180;background-image: url(https://www.sensifyaware.com/static/media/new_hero_img.69548dd83cca785071ce.png);padding: 15px;border-radius: 15px 15px 0 0 ;height: 100px;display: flex;align-items: center;justify-content: center;background-size: cover;background-position: right center;">
                        <img src="https://i.ibb.co/mc259Kv/sensifylogo.png" style="width: 180px;" alt="" />
                    </div>
                </td>
            </tr>
            <tr>
                <td style="padding: 10px 15px 0;">
                    <h2 style="font-size: 45px;margin:10px 0 0;text-align: center;color: #000;">Hey!</h2>
                    <h5 style="text-align: center;
                    font-size: 25px;
                    margin: 10px 0 0 0;
                    font-weight: 500;
                    color: #000;">Welcome to SensifyAware,</h5>
                    <h6
                        style="margin: 0 auto 10px;width: 100%;max-width: 100%;text-align: center;font-weight: 400;font-size: 15px;margin-top: 10px">
                        You’ve been added to a clinical trial.<br><b>Please download the app from</b></h6>
                </td>
            </tr>
            <tr>
                <td style="padding: 0 15px 25px;">
                    <div style="display: flex;align-items: center;justify-content: center;">
                        <a href="https://apps.apple.com/in/app/sensifyaware/id1638890466" target="_blank"><img
                                src="https://www.sensifyaware.com/static/media/play_icon1.16357a30e3e5218a8ca9.png"
                                style="width: 150px;" alt=""></a>
                        <a href="https://play.google.com/store/apps/details?id=com.sensifyaware" target="_blank"><img
                                src="https://www.sensifyaware.com/static/media/macIcon.db910c146999ea09fa66.png"
                                style="width: 150px;" alt=""></a>
                    </div>
                </td>
            </tr>
        </table>
    </section>
</body>
    `,
    templateWithCred: `
    <body
    style="margin: 0;padding: 20px;box-sizing: border-box;font-family: 'DM Sans', sans-serif;background-color: #fff;">
    <section
        style="width: 100%;max-width: 650px;padding: 0;box-sizing: border-box;margin: auto;padding: 25px;background-color: #ffc100;border-radius: 8px;display: flex;min-height: auto;align-items: center;justify-content: center;">
        <table style="width: 100%;">
            <tr>
                <td style="text-align: center;">
                    <img src="https://analytics-sensify-dashboard-deploy.s3.amazonaws.com/sensifylogo.png" style="filter: brightness(0);" alt>
                    <div
                        style="width:100%;height:4px;border-radius:10px;background-color:#000;margin: 15px auto 0;    max-width: 50px;"></div>
                </td>
            </tr>
            <tr>
                <td>
                    <h2
                        style="font-size:40px;margin:10px 0 0;text-align: center;color: #031A40;">Welcome
                        to Intellivista. </h2>
                    <h5
                        style="text-align: left;font-size: 20px;font-weight: 600;margin: 10px 0 0 0;font-weight: 400;color: #000;margin-bottom: 0px;">Hi
                        {{name}},</h5>
                        <!-- <img src="email.png" width="100%" alt=""> -->
                    <p
                        style="font-size: 14px;color: #000;font-weight: 500;">Your
                        username is: <span
                            style="color: #031A40;font-weight: 700;">{{email}}</span></p>
                    <p
                        style="font-size: 14px;color: #000;font-weight: 500;">One
                        Time Password is: <span
                            style="color: #031A40;font-weight: 700;">{{password}}</span></p>
                    <p
                        style="font-size: 14px;color: #000;font-weight: 500;">Your
                        Sensify Researcher ID: <span
                            style="color: #031A40;font-weight: 700;">{{userId}}</span></p>
                    <p
                        style="font-size: 14px;color: #000;font-weight: 500;">
                        Please log on to Intellivista using the following
                        website <a href="http://analytics.sensifyaware.com"
                            style="color: #031A40;font-weight: 700;text-decoration: underline;">http://analytics.sensifyaware.com</a></p>

                    <p
                        style="font-size: 14px;color: #000;font-weight: 500;">You
                        can change your password after you login.</p>

                    <p
                        style="font-size: 14px;color: #000;font-weight: 500;">If
                        you have any questions, please do not hesitate to
                        contact us at <span
                        style="color: #031A40;font-weight: mailto:700;">info@sensifylife.com</span></p>

                    <p
                        style="font-size: 14px;color: #000;font-weight: 500;">Thank
                        you for your interest in Intellivista.</p>

                    <p
                        style="font-size: 14px;color: #000;font-weight: 500;">
                        Best Regards,</p>

                    <p
                        style="font-size: 14px;color: #000;font-weight: 500;margin-bottom: 0;">Team
                        Sensify</p>
                </td>
            </tr>
        </table>
    </section>
</body>

    `,

    templateForParticipantLogin: `<body style="margin: 0;padding: 20px;box-sizing: border-box;font-family: 'DM Sans', sans-serif;background-color: #fff;">
    <section
        style="width: 100%;max-width: 500px;padding: 0;box-sizing: border-box;margin: auto;background-color: #fff;border-radius: 8px;display: flex;height: calc(100vh - 40px);align-items: center;justify-content: center;">
        <table style="width: 100%;border: 1px solid #004180;
        border-spacing: 0;
        border-radius: 15px;
        margin: 0;
        padding: 0;">
            <tr>
                <td style="text-align: center;padding: 0;">
                    <div class="logo_header"
                        style="background-color: #004180;background-image: url(https://www.sensifyaware.com/static/media/new_hero_img.69548dd83cca785071ce.png);padding: 15px;border-radius: 15px 15px 0 0 ;height: 100px;display: flex;align-items: center;justify-content: center;background-size: cover;background-position: right center;">
                        <img src="https://i.ibb.co/mc259Kv/sensifylogo.png" style="width: 180px;" alt="" />
                    </div>
                </td>
            </tr>
            <tr>
                <td style="padding: 10px 15px 0;">
                    <h2 style="font-size: 45px;margin:10px 0 0;text-align: center;color: #000;">Hey!</h2>
                    <h5 style="text-align: center;
                    font-size: 25px;
                    margin: 10px 0 0 0;
                    font-weight: 500;
                    color: #000;">Welcome to SensifyAware,</h5>
                    <h6
                        style="margin: 0 auto 10px;width: 100%;max-width: 100%;text-align: center;font-weight: 400;font-size: 15px;margin-top: 10px">
                        You’ve been added to a clinical trial.<br><b>Please download the app from below links and login using this credential</b></h6>
                </td>
            </tr>
            <tr>
                <td style="padding: 0 15px 25px;">
                    <h6
                        style="margin: auto;width: 100%;max-width: 100%;text-align: center;font-weight: 400;font-size: 15px;display: flex;justify-content: start;align-items: center;margin-bottom: 5px;padding-left: 25.5%;">
                        <b style="color: #004180;display: inline-flex;align-items: center;column-gap: 5px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-envelope-fill" viewBox="0 0 16 16">
                                <path
                                    d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                            </svg> Email: </b> {{email}}
                    </h6>
                    <h6
                        style="margin: auto;width: 100%;max-width: 100%;text-align: center;font-weight: 400;font-size: 15px;display: flex;justify-content: flex-start;padding-left: 25.5%;align-items: center;">
                        <b style="color: #004180;display: inline-flex;align-items: center;column-gap: 5px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-file-earmark-lock2" viewBox="0 0 16 16">
                                <path
                                    d="M10 7v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V9.3c0-.627.46-1.058 1-1.224V7a2 2 0 1 1 4 0zM7 7v1h2V7a1 1 0 0 0-2 0z" />
                                <path
                                    d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                            </svg> Password: </b> {{password}}
                    </h6>
                </td>
            </tr>
            <tr>
                <td style="padding: 0 15px 25px;">
                    <div style="display: flex;align-items: center;justify-content: center;">
                        <a href="https://apps.apple.com/in/app/sensifyaware/id1638890466" target="_blank"><img
                                src="https://www.sensifyaware.com/static/media/play_icon1.16357a30e3e5218a8ca9.png"
                                style="width: 150px;" alt=""></a>
                        <a href="https://play.google.com/store/apps/details?id=com.sensifyaware" target="_blank"><img
                                src="https://www.sensifyaware.com/static/media/macIcon.db910c146999ea09fa66.png"
                                style="width: 150px;" alt=""></a>
                    </div>
                </td>
            </tr>
        </table>
    </section>
</body>`,

templateForParticipant: `<body style="margin: 0;padding: 20px;box-sizing: border-box;font-family: 'DM Sans', sans-serif;background-color: #fff;">
<section
    style="width: 100%;max-width: 500px;padding: 0;box-sizing: border-box;margin: auto;background-color: #fff;border-radius: 8px;display: flex;height: calc(100vh - 40px);align-items: center;justify-content: center;">
    <table style="width: 100%;border: 1px solid #004180;
    border-spacing: 0;
    border-radius: 15px;
    margin: 0;
    padding: 0;">
        <tr>
            <td style="text-align: center;padding: 0;">
                <div class="logo_header"
                    style="background-color: #004180;background-image: url(https://www.sensifyaware.com/static/media/new_hero_img.69548dd83cca785071ce.png);padding: 15px;border-radius: 15px 15px 0 0 ;height: 100px;display: flex;align-items: center;justify-content: center;background-size: cover;background-position: right center;">
                    <img src="https://i.ibb.co/mc259Kv/sensifylogo.png" style="width: 180px;" alt="" />
                </div>
            </td>
        </tr>
        <tr>
            <td style="padding: 10px 15px 0;">
                <h2 style="font-size: 45px;margin:10px 0 0;text-align: center;color: #000;">Hey!</h2>
                <h5 style="text-align: center;
                font-size: 25px;
                margin: 10px 0 0 0;
                font-weight: 500;
                color: #000;">Welcome to SensifyAware,</h5>
                <h6
                    style="margin: 0 auto 10px;width: 100%;max-width: 100%;text-align: center;font-weight: 400;font-size: 15px;margin-top: 10px">
                    You’ve been added to a clinical trial.<br><b>Please download and login the app from</b></h6>
            </td>
        </tr>
        <tr>
            <td style="padding: 0 15px 25px;">
                <div style="display: flex;align-items: center;justify-content: center;">
                    <a href="https://apps.apple.com/in/app/sensifyaware/id1638890466" target="_blank"><img
                            src="https://www.sensifyaware.com/static/media/play_icon1.16357a30e3e5218a8ca9.png"
                            style="width: 150px;" alt=""></a>
                    <a href="https://play.google.com/store/apps/details?id=com.sensifyaware" target="_blank"><img
                            src="https://www.sensifyaware.com/static/media/macIcon.db910c146999ea09fa66.png"
                            style="width: 150px;" alt=""></a>
                </div>
            </td>
        </tr>
    </table>
</section>
</body>`,

ParticipantAlreadyInTrail : `
<body style="margin: 0;padding: 20px;box-sizing: border-box;font-family: 'DM Sans', sans-serif;background-color: #fff;">
    <section
        style="width: 100%;max-width: 500px;padding: 0;box-sizing: border-box;margin: auto;background-color: #fff;border-radius: 8px;display: flex;height: calc(100vh - 40px);align-items: center;justify-content: center;">
        <table style="width: 100%;border: 1px solid #004180;
        border-spacing: 0;
        border-radius: 15px;
        margin: 0;
        padding: 0;">
            <tr>
                <td style="text-align: center;padding: 0;">
                    <div class="logo_header"
                        style="background-color: #004180;background-image: url(https://www.sensifyaware.com/static/media/new_hero_img.69548dd83cca785071ce.png);padding: 15px;border-radius: 15px 15px 0 0 ;height: 100px;display: flex;align-items: center;justify-content: center;background-size: cover;background-position: right center;">
                        <img src="https://i.ibb.co/mc259Kv/sensifylogo.png" style="width: 180px;" alt="" />
                    </div>
                </td>
            </tr>
            <tr>
                <td style="padding: 10px 15px 0;">
                    <h2 style="font-size: 45px;margin:10px 0 0;text-align: center;color: #000;">Hey!</h2>
                    <h5 style="text-align: center;
                    font-size: 25px;
                    margin: 10px 0 0 0;
                    font-weight: 500;
                    color: #000;">Welcome to SensifyAware,</h5>
                    <h6
                        style="margin: 0 auto 10px;width: 100%;max-width: 100%;text-align: center;font-weight: 400;font-size: 15px;margin-top: 10px">
                        Participant with this email is already in a clinical trail : -  <span>{{email}}</span><br>
                    </h6>
                </td>
            </tr>
        </table>
    </section>
</body>`,

};