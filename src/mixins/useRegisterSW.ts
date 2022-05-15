import Vue from "vue"

export default Vue.extend({
  name: "useRegisterSW",
  data() {
    return {
      updateSW: undefined as any,
      offlineReady: false,
      needRefresh: false  
    }
  },
  async mounted() {
    try {
      const { registerSW } = await import("virtual:pwa-register")
      const vm = this
      this.updateSW = registerSW({
        immediate: true,
        onOfflineReady() {
          vm.offlineReady = true
          vm.onOfflineReadyFn()
        },
        onNeedRefresh() {
          vm.needRefresh = true
          vm.onNeedRefreshFn()
        },
        onRegistered(swRegistration: any) {
          swRegistration && vm.handleSWManualUpdates(swRegistration)   
        },
        onRegisterError(e: any) {
          vm.handleSWRegisterError(e)    
        }  
      })
    } catch {
      console.log("PWA disabled.")
    }

  },
  methods: {
    async closePromptUpdateSW() {
      this.offlineReady = false
      this.needRefresh = false
    },
    onOfflineReadyFn() {
      console.log("onOfflineReady")
    },
    onNeedRefreshFn() {
      console.log("onNeedRefresh")
    },
    updateServiceWorker() {
      this.updateSW && (this.updateSW as (val: boolean) => void)(true)
      location.reload()
    },
    handleSWManualUpdates(swRegistration: any) {}, 
    handleSWRegisterError(error: any) {} 
  }
})