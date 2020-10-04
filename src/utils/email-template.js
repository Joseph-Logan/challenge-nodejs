const emailTemplate = (data) => `
<html xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Static Template</title>
    <style>
    .card {
      font-weight: 400;
      border: 0;
      -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
        0 2px 10px 0 rgba(0, 0, 0, 0.12);
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
        0 2px 10px 0 rgba(0, 0, 0, 0.12);
      font-family: Sans-serif;
    }

    .card-body {
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;
      border-radius: 0 !important;
    }

    .card-title {
      margin-bottom: 0.75rem;
    }

    .mx-4 {
      margin: 0 3rem;
    }

    .card .card-body .card-text {
      font-size: 0.9rem;
      font-weight: 400;
      color: #747373;
      border: 1 solid black;
    }

    .content {
      width: 100%;
      padding-right: 15px;
      padding-left: 15px;
      margin-right: auto;
      margin-left: auto;
    }
    .d-flex {
      display: flex;
      flex: 1;
    }

    .justify-content-between {
      justify-content: space-between;
    }
  </style>
  </head>
  
  <body>
    <div class="card">
      <div class="card-body content">
        <h4 class="card-title d-flex justify-content-between">
          <span class="">Solicitud de informacion para microprestamo</span>
          <span>Fecha: ${new Date()}</span>
        </h4>

        <div class="card-text">
          Informacion del solicitante

          <div>
            
            ${
              Object.entries(data).map(item => {
                return `<p><strong>${item[0]}:</strong> ${item[1]}</p>`
              })
            }
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

`

module.exports = emailTemplate