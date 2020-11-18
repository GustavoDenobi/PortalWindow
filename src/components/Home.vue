<template>
  <div class="h-100">
    <video
      ref="remoteVideo"
      id="remoteVideo"
      autoplay
      @click="toggleInterfaceVisibility()"
    ></video>

    <div ref="interface" class="interface h-100">
      <div class="settings h-100 float-left">
        <settings
          ref="stgsPanel"
          v-if="showSettings"
          @canceled="showSettings = !showSettings"
          @saved="
            showSettings = !showSettings;
            stgsSaved();
          "
        ></settings>
      </div>

      <div class="displayPanel">
        
        
        <input
          type="range"
          min="0"
          max="100"
          value="50"
          step="1"
          class="slider displayPanelElement"
          id="volumeSlider"
          ref="volumeSlider"
          @input="setRemoteAudioVolume()"
        />
        <br>
        <b-button pill class = "displayPanelElement displayPanelButton" @click="toggleMute()">
          <b-icon
            ref="muteButton"
            id="muteButton"
            class="icon"
            icon="mic-mute-fill"
            style="color: white"
          ></b-icon>
        </b-button>
        <br>
        <b-button pill class="displayPanelElement displayPanelButton" @click="showSettings = !showSettings">
          <b-icon class="icon" icon="gear-fill"></b-icon>
        </b-button>

      </div>
    </div>

    <video
      ref="localVideo"
      id="localVideo"
      autoplay
      muted
      width="20%"
      height="20%"
    ></video>
  </div>
</template>

<script>
import Settings from "./Settings";
import Peer from "peerjs";
import { Statics } from "../common/peerConnector.js";

export default {
  name: "Home",
  components: {
    Settings,
  },
  data() {
    return {
      ownId: "a",
      peerId: "b",
      statusMessage: "Connecting...",
      isConnected: false,
      showSettings: false,
      interfaceTimeout: 10000,
      isMuted: false,
      stgs: this.$root.$data.stgs,
    };
  },
  computed: {
    Connected() {
      return this.isConnected;
    },
  },
  mounted() {
    console.log(this);
    this.getUserMedias();
    this.startPeerJs();
  },
  methods: {
    stgsSaved() {
      this.startPeerJs();
    },

    async getUserMedias() {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: { facingMode: "user" },
      });

      this.$refs.remoteVideo.srcObject = this.localStream;
      this.$refs.localVideo.srcObject = this.localStream;
    },

    startPeerJs() {
      let cpt = this;

      this.$root.pc = this.$root.pc = new Peer(
        this.stgs.localId,
        Statics.webrtcConfig
      );
      this.peer = this.$root.pc;

      this.peer.on("error", function (err) {
        console.log("PEER ERROR!");
        console.log(err);
      });

      this.peer.on("open", function (id) {
        console.log("My peer ID is: " + id);
      });

      //receive data connection
      this.peer.on("connection", function (conn) {
        cpt.conn = conn;
        cpt.bindDataCallbacks(cpt);
      });

      //answer a call
      this.peer.on("call", function (call) {
        if (call.peer !== cpt.stgs.remoteId) {
          console.log("call from wrong peerId, ignoring!: " + call.peer);
          console.log(cpt.stgs);
          return;
        }
        console.log("answered");
        console.log(call);

        // Answer the call, providing our mediaStream
        call.answer(cpt.localStream);
        cpt.call = call;
        cpt.bindCallCallbacks(cpt);
      });
    },

    async connectToRemotePeer() {
      console.log("calling");
      //start a call
      this.call = this.peer.call(this.stgs.remoteId, this.localStream);
      this.bindCallCallbacks(this);
      console.log("called");

      //start data connection
      this.conn = await this.peer.connect(this.stgs.remoteId);
    },

    bindCallCallbacks(cpt) {
      console.log("called Call CallBack");
      cpt.call.on("stream", function (stream) {
        console.log("ON STREAM RECEIVED!");

        cpt.$refs.remoteVideo.srcObject = stream;
      });
    },

    bindDataCallbacks(cpt) {
      cpt.conn.on("data", function (data) {
        console.log("Received", data);
      });
    },

    toggleInterfaceVisibility() {
      //var interfaceTimeout = this.interfaceTimeout;
      let component = this.$refs.interface;
      if (component.style.visibility === "hidden") {
        component.style.visibility = "visible";
        //setTimeout(function () {
        //  component.style.visibility = "hidden";
        //}, interfaceTimeout);
      } else {
        component.style.visibility = "hidden";
      }
    },

    setRemoteAudioVolume() {
      document.getElementById("remoteVideo").volume =
        parseFloat(this.$refs.volumeSlider.value) / 100;
    },

    toggleMute() {
      this.$data.isMuted = !this.$data.isMuted;
      document.getElementById("remoteVideo").volume = this.isMuted
        ? 0
        : parseFloat(this.$refs.volumeSlider.value) / 100;
      document.getElementById("muteButton").style.color = this.isMuted
        ? "rgb(0, 123, 255)"
        : "white";
      document.getElementById("volumeSlider").disabled = this.isMuted;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#remoteVideo {
  position: absolute;
  transform: rotate(90deg);
  transform-origin: bottom left;
  width: 100vh;
  height: 100vw;
  margin-top: -100vw;
  object-fit: cover;
  z-index: 0;
  visibility: visible;
}

#localVideo {
  position: absolute;
  z-index: 1;
  transform: rotate(90deg);
  opacity: 0.5;
  bottom: 0;
  right: 0;
  margin: 0;
  padding: 0;
  width: 15vh;
  height: 15vw;
  margin-bottom: 7vw;
}

.interface {
  position: absolute;
  z-index: 2;
  opacity: 0.5;
  visibility: hidden;
}

.settings {
width: 20vw;
position: absolute;
bottom: 0;
}

.displayPanel {
  font-size: 5vw;
  position: absolute;
  bottom: 0;
  margin: 3vw;
}

.statusMessage{
  font-size: inherit
}

.slider {
  -webkit-appearance: slider-vertical;
  height: 2vh; /* Specified height */
  transform: scale(5);
  margin-bottom: 6vh !important
}

.displayPanelElement{
  width: 10vw;
  margin: 2vw
}

.displayPanelButton {
height: 8vw;

}

.icon {
  width: 5vw;
  height: 5vw;
}

</style>
