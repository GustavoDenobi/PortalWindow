<template>
  <div class="mainDiv p-2 h-100">
    <h2>Settings</h2>
    <b-form @submit="onSave" @reset="onReset">
      <b-form-group label="My ID:">
        <b-form-input v-model="stgs.localId"></b-form-input>
      </b-form-group>
      <b-form-group label="Remote ID:">
        <b-form-input v-model="stgs.remoteId"></b-form-input>
      </b-form-group>
      <b-button type="reset">CANCEL</b-button>
      <b-button type="submit" variant="primary">SAVE</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "Settings",
  mounted() {
    this.stgs = { ...this.$root.$data.stgs };
  },
  data() {
    return {
      stgs: {}
    };
  },
  props: {
    isOpen: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    onSave(evt) {
      evt.preventDefault();
      console.log(evt);
      Object.assign(this.$root.$data.stgs, this.stgs);
      this.$root.$data.saveToStorage();
      this.$emit("saved");
    },
    onReset(evt) {
      evt.preventDefault();
      this.stgs = { ...this.$root.$data.stgs };
      this.$emit("canceled");
    },
    dismissed() {
      console.log("Alert dismissed");
    }
  }
};
</script>

<style scoped>
.mainDiv {
  background: rgb(128, 128, 128);
}
</style>