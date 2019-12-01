import {Component} from '@angular/core';
import {EmailComposer} from '@ionic-native/email-composer/ngx';
import {Vibration} from '@ionic-native/vibration/ngx';
import {formatDate} from '@angular/common';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    private acao;

    constructor(
        private vibration: Vibration,
        private emailComposer: EmailComposer,
    ) {
        this.init();
    }

    init() {
        this.acao = {
            data: new Date().toISOString(),
            num_voo: '',
            troca_tripulacao: false,
            chegada_tripulacao: { time: '00:00:00', timeBegan: null, timeStopped: null, stoppedDuration: null,
                running: false, started: null},
            tripulacao_assumindo: { time: '00:00:00', timeBegan: null, timeStopped: null, stoppedDuration: null,
                running: false, started: null},
            responsavel: '',
            ps: { time: '00:00:00', timeBegan: null, timeStopped: null, stoppedDuration: null, running: false, started: null},
            ca: { time: '00:00:00', timeBegan: null, timeStopped: null, stoppedDuration: null, running: false, started: null},
            ld: { time: '00:00:00', timeBegan: null, timeStopped: null, stoppedDuration: null, running: false, started: null},
            td: { time: '00:00:00', timeBegan: null, timeStopped: null, stoppedDuration: null, running: false, started: null},
            le: { time: '00:00:00', timeBegan: null, timeStopped: null, stoppedDuration: null, running: false, started: null},
            te: { time: '00:00:00', timeBegan: null, timeStopped: null, stoppedDuration: null, running: false, started: null},
            fp: { time: '00:00:00', timeBegan: null, timeStopped: null, stoppedDuration: null, running: false, started: null},
            pb: { time: '00:00:00', timeBegan: null, timeStopped: null, stoppedDuration: null, running: false, started: null},
            informacao_adicional: '',
        };
    }

    setDate(operacao) {
        this.acao[operacao].time = this.toDateString(new Date());
    }

    saveIntoDatabase() {
        // TODO: Salvar no banco de dados o registro
    }

    toDateString(date) {
        return formatDate(date, 'dd/MM/yyyy HH:mm', 'pt');
    }

    sendToEmail() {
        const date = this.toDateString(this.acao.data);

        const emailMessage = `
                    <h2>Nº do Voo</h2>
                    <p>${this.acao.num_voo}</p>
                    <h2>Data</h2>
                    <p>${date}</p>
                    <h2>Responsável</h2>
                    <p>${this.acao.responsavel}</p>
                    <h2>Houve troca de tripulação?</h2>
                    <p>${this.acao.troca_tripulacao ? 'Sim' : 'Não'}</p>
                    <h2>PS</h2>
                    <p>${this.acao.ps.time}</p>
                    <h2>CA</h2>
                    <p>${this.acao.ca.time}</p>
                    <h2>LD</h2>
                    <p>${this.acao.ld.time}</p>
                    <h2>TD</h2>
                    <p>${this.acao.td.time}</p>
                    <h2>LE</h2>
                    <p>${this.acao.le.time}</p>
                    <h2>TE</h2>
                    <p>${this.acao.te.time}</p>
                    <h2>FP</h2>
                    <p>${this.acao.fp.time}</p>
                    <h2>PB</h2>
                    <p>${this.acao.pb.time}</p>
                    <h2>Chegada da tripulação</h2>
                    <p>${this.acao.chegada_tripulacao.time}</p>
                    <h2>Tripulação assumindo</h2>
                    <p>${this.acao.tripulacao_assumindo.time}</p>
                    <h2>Informações Adicionais</h2>
                    <p>${this.acao.informacao_adicional}</p>
`;
        const email = {
            to: 'ra.gjribeiro@voegol.com.br',
            subject: `Atendimento do Voo ${this.acao.num_voo} - ${date}`,
            body: emailMessage,
            isHtml: true
        };

        const app = this;

        this.emailComposer.open(email).then(() => {
            app.init();
        });
    }

    save() {
        this.sendToEmail();
    }
}
