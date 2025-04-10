<template>
    <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1055;">
        <div 
        ref="toast" 
        class="toast" 
        role="alert" 
        aria-live="assertive" 
        aria-atomic="true" >
            <div class="toast-header">
            <strong class="me-auto">{{ type }}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" @click="hideToast"></button>
            </div>
            <div class="toast-body">
            {{ message }}
            </div>
        </div>
    </div>
</template>

<script>
import { Toast as BootstrapToast} from 'bootstrap'

export default {
    props: {
        message: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'Error'
        },
        duration: {
            type: Number,
            default: 3000
        }
    },
    data() {
        return {
            visible: false,
        };
    },
    watch: {
        message(newMessage) {
            if (newMessage) {
                this.showToast(newMessage);
            }
        }
    },
    methods: {
        showToast() {
            if (!this.BootstrapToast){
                this.BootstrapToast = new BootstrapToast(this.$refs.toast, {
                    autohide: true,
                    delay: this.duration,
                });
            }

            this.BootstrapToast.show();

            setTimeout(() => {
                this.BootstrapToast.hide();
                this.$emit('clear');
            }, this.duration + 200);
        },
        hideToast() {
            if (this.BootstrapToast) {
                this.BootstrapToast.hide();
                this.$emit('clear');
            }
        }
    },
    mounted() {
        this.BootstrapToast = new BootstrapToast(this.$refs.toast, {
            autohide: true,
            delay: this.duration,
        });
    },
}

</script>