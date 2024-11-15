import { defineStore } from 'pinia'

export const storeList = defineStore('list', {
  state: () => ({
    sequence: 0,
    name: '',
    messageStatusReport: '',
    loading: false
  }),

  actions: {
    setLoading(value: boolean) {
      this.loading = value;
    },

    initializeStore() {
      if (typeof window !== 'undefined') {
        this.sequence = parseInt(localStorage.getItem('sequence') || '0')
        this.name = localStorage.getItem('name') || ''
      }
    },

    setSequence(newSequence: number) {
      this.sequence = newSequence
      if (typeof window !== 'undefined') {
        localStorage.setItem('sequence', newSequence.toString())
      }
    },

    setName(newName: string) {
      this.name = newName
      if (typeof window !== 'undefined') {
        localStorage.setItem('name', newName)
      }
    },

    setMessageStatusReport(messageStatus: any) {
      this.messageStatusReport = messageStatus
      if (typeof window !== 'undefined') {
        localStorage.setItem('messageStatusReport', JSON.stringify(messageStatus))
      }
    },

    clearStore() {
      this.sequence = 0
      this.name = ''
      if (typeof window !== 'undefined') {
        localStorage.removeItem('sequence')
        localStorage.removeItem('name')
      }
    }
  },

  getters: {
    getMessageStatus: (state) => state.messageStatusReport,
    getSequence: (state) => state.sequence,
    getName: (state) => state.name
  }
})