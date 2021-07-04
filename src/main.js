import App from "src/app/app-vue"

class Main {

    constructor(){

        window.addEventListener("load", () => {
            this.initialize()
        } );

    }

    initialize(){
        this.start()
    }

    start(){
        this.app = App({})
    }

}

const main = new Main();

if ( typeof window !== 'undefined')
    window.App = main;

export default main;
