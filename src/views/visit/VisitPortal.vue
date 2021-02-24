<template>
   <v-content>
       <v-container fill-height class="full-screen d-flex align-start justify-center">
        <h1 class="text-xl-h5 text-lg-h5">
            Portal de Visitas
        </h1>        
        <v-row>
            <v-col style="max-height: 500px">
                <qrcode-stream @decode="onDecode" v-if="showDecode" ></qrcode-stream>
            </v-col>
        </v-row>
        <ConfirmVisitModal/>
       </v-container>
   </v-content>
</template>

<script>

import { QrcodeStream } from 'vue-qrcode-reader'
import ConfirmVisitModal from './ConfirmVisitModal'
import { mapActions } from 'vuex';


export default {
    data: function () {
        return {
            showDecode: true
        };
    },
    components: {
        QrcodeStream,
        ConfirmVisitModal
    },
    methods:{
        ...mapActions('authentication', ['fetchVisitaFind']),
        ...mapActions('modal', ['openModalConfirmVisit']),
        
        async onInit (promise) {
            try {
                await promise
            } catch (error) {
                if (error.name === 'NotAllowedError') {
                this.error = "ERROR: you need to grant camera access permisson"
                } else if (error.name === 'NotFoundError') {
                this.error = "ERROR: no camera on this device"
                } else if (error.name === 'NotSupportedError') {
                this.error = "ERROR: secure context required (HTTPS, localhost)"
                } else if (error.name === 'NotReadableError') {
                this.error = "ERROR: is the camera already in use?"
                } else if (error.name === 'OverconstrainedError') {
                this.error = "ERROR: installed cameras are not suitable"
                } else if (error.name === 'StreamApiNotSupportedError') {
                this.error = "ERROR: Stream API is not supported in this browser"
                }
            }
            },
        onDecode(valor){
            console.log(valor);
            if(valor){
                this.fetchVisitaFind(valor);
                this.openModalConfirmVisit(true);
                this.showDecode = false;
                setTimeout(()=>{ this.showDecode = true; }, 1000);
            }
        }
    }
}
</script>

<style>

</style>