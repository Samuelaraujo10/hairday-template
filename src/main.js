"use strict"

// 1. Configuração global do Day.js (idioma pt-br)
import "./libs/dayjs.js"

// 2. Importação dos arquivos de estilização (CSS processado pelo Webpack)
import "./styles/global.css"
import "./styles/form.css"
import "./styles/schedule.css"
import "./styles/toast.css"

// 3. Importação dos módulos JavaScript (comportamento da aplicação)
import "./modules/form/submit.js"
import "./modules/form/date-change.js"
import "./modules/schedules/cancel.js"
import "./modules/page-load.js"
