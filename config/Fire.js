/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable class-methods-use-this */
/* eslint-disable indent */
/* eslint-disable no-tabs */
import firebase from 'firebase';

class Fire {
  constructor() {
		if (!firebase.apps.length) {
			this.init();
		}
  }

  init = () => firebase.initializeApp({
    apiKey: 'AIzaSyBYJkTciWinAUcJr-d1h5X3tR6YmyQlT48',
    authDomain: 'occupapp-5db49.firebaseapp.com',
    databaseURL: 'https://occupapp-5db49.firebaseio.com',
    projectId: 'occupapp-5db49',
    storageBucket: 'occupapp-5db49.appspot.com',
    messagingSenderId: '365490821127',
    appId: '1:365490821127:web:f8cb7a0b2e9b7147',
	});

	createAccount = async (user) => {
		firebase.auth()
			.createUserWithEmailAndPassword(user.email, '921225');
	}

	observeAuth = (email, pass) => firebase.auth()
		.onAuthStateChanged(user => this.onAuthStateChanged(user, email, pass));

  onAuthStateChanged = (user, email, pass) => {
		console.log('User', user);
    if (!user) {
      firebase.auth().signInWithEmailAndPassword(email, pass);
    }
  };

  get ref() {
    return firebase.database().ref('messages');
  }

  on = (callback) => {
		this.ref
			.limitToLast(20)
			.on('child_added', snapshot => callback(this.parse(snapshot)));
	}

	parse = (snapshot) => {
		const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
	}

	off() {
	  this.ref.off();
	}

	get uid() {
		return (firebase.auth().currentUser || {}).uid;
	}

	get timestamp() {
		return firebase.database.ServerValue.TIMESTAMP;
	}

	send = (messages) => {
		for (let i = 0; i < messages.length; i += 1) {
			const { text, user } = messages[i];
			const message = {
				text,
				user,
				timestamp: this.timestamp,
			};
			this.ref.push(message);
		}
	};
}

Fire.shared = new Fire();
export default Fire;
