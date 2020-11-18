import Peer from "peerjs";

export const Statics = {
  webrtcConfig: {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
  }
};

export class PeerConnector {
  constructor() {
    this.statusMessage = "starting...";
  }

  Init(localId) {
    this._localId = localId;
    this.peer = new Peer(localId);
    console.log("initiated eith localId: " + localId);
  }

  ChangeMessage() {
    this.statusMessage += "__" + Date.now();
    console.log(this.statusMessage);
  }

  Connect(remoteId) {
    this._remoteId = remoteId;
    this.conn = this.peer.connect(remoteId);
    this.conn.on("open", () => {
      this.conn.send("hi!");
    });
  }
}
