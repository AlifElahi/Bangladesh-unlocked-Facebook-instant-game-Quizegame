


////
import React, { Component } from 'react';
import m5 from "../src/img/m5.svg";
import win from "../src/img/win.png";
import acceptEng from "../src/img/acceptEng.svg";
import acceptBan from "../src/img/acceptBan.svg";
import play from "../src/img/playAgain.svg";
import logo from "../src/img/logo1.png";
// import logo1 from "../src/img/logo1.svg";
import banglaQ from "../src/banglaqns";
import englishQ from "../src/englishqns";
import language from "./img/ll.svg"
import image from "./img/image.js";
import terms from "./tremand condition.js"
import trm from "./img/trm.svg"
import trmL from "./img/trmL.png"
// import adds from "./img/image.js";
import './App.css';
import { greenColor, broderR, redColor, addPoition, addduration, lvl5duretion, answerColorDuration, imageBackgroundColor, ansOptionColor, scriptUrl, fontER, fontBR, fontEB, fontBB } from "./control.js";


class Temp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      colorChange: false,
      questions: [],
      language: '',
      level: 0,
      showAdds: false,
      lvl5Modal: false,
      tryAgain: false,
      conditionPage: false
    };
    this.img = image.backImages
    this.adds = []
    this.m5 = new Image().src = m5;
    this.win = new Image().src = win;
    this.logo = new Image().src = logo;
    this.trm = new Image().src = trm;
    this.trmL = new Image().src = trmL;
    this.languageImg = new Image().src = language;
    this.bquestions = []
    this.equestions = []
    this.contextId = null
    this.contextType = null
    this.answerGiven = null
    this.playerName = null
    this.playerPic = null
    this.playerId = null
    this.fontB = fontEB
    this.fontR = fontER
    this.marginvh = 0
    this.terms = terms.termE
    this.broderR = broderR
    this.acceptBtn = new Image().src = acceptEng
    this.play = null
    this.tt=[];
  }
  async componentDidMount() {
    this.img.forEach((image) => {
      new Image().src = image;
    });

    // this.adds = await this.shuffleArray(this.adds);
    this.win = new Image().src = win;
    this.logo = new Image().src = logo;
    this.acceptBtn = new Image().src = acceptEng
    this.trm = new Image().src = trm;
    this.trmL = new Image().src = trmL;
    this.play = new Image().src = play
    this.languageImg = new Image().src = language;
    // this.adds.forEach((image) => {
    //   new Image().src = image
    // });

    const script = document.createElement('script');
    script.src = "https://connect.facebook.net/en_US/fbinstant.6.3.js"
    script.id = "fbinstant"
    document.body.appendChild(script);
    this.marginvh = window.innerWidth / window.innerHeight < .5 ? "20vh" : "18vh"

    let bquestion = []
    let equestion = []
    let add = []
    let rand = []
    for (let i = 0; rand.length < addPoition.length; i++) {
      let w = Math.floor((Math.random() * 11) + 0)
      if (!rand.includes(w)) {
        rand.push(w)
        let p = image.adds[w]
        console.log("add", w);
        let r = new Image().src = p;
        add.push(r)
      }
    }
    // for (let i = 0; i < banglaQ.length; i++) {
    //   let q = banglaQ[i][Math.floor((Math.random() * banglaQ[i].length) + 0)]
    //   let eq = englishQ[i][Math.floor((Math.random() * englishQ[i].length) + 0)]
    //   q.answers = await this.shuffleArray(q.answers);
    //   eq.answers = await this.shuffleArray(eq.answers);
    //   bquestion.push(q);
    //   equestion.push(eq);

    // }
    for (let i = 0; i < banglaQ.length; i++) {
      for (let j = 0; j < banglaQ[i].length; j++) {
       
        let q = banglaQ[i][j]
      let eq = englishQ[i][j]
      // q.answers = await this.shuffleArray(q.answers);
      // eq.answers = await this.shuffleArray(eq.answers);
      bquestion.push(q);
      equestion.push(eq);
      }
      

    }
    this.adds = add
    this.setState({ questions: bquestion })
    this.bquestions = bquestion; this.equestions = equestion;
    script.onload = () => {
      window.FBInstant.initializeAsync()
        .then(function () {

          for (var i = 0; i < 100; i += 10) {

            window.FBInstant.setLoadingProgress(i);

          }


          window.FBInstant.startGameAsync()
            .then(function () {

              // Retrieving context and player information can only be done
              // once startGameAsync() resolves
              this.contextId = window.FBInstant.context.getID();
              this.contextType = window.FBInstant.context.getType();
              this.playerName = window.FBInstant.player.getName();
              this.playerPic = window.FBInstant.player.getPhoto();
              this.playerId = window.FBInstant.player.getID();
              // console.log("hdd", this.playerName );

              // Once startGameAsync() resolves it also means the loading view has 
              // been removed and the user can see the game viewport
            });
        }
          // Start loading game assets here
        );

    }

  }

  async common() {
    let question = []
    let add = []
    let qu = null
    if (this.state.language === 'eng') {
      qu = englishQ
    }
    if (this.state.language === 'ban') {
      qu = banglaQ

    }
    for (let i = 0; i < qu.length; i++) {
    
      let q = qu[i][Math.floor((Math.random() * banglaQ[i].length) + 0)]

      q.answers = await this.shuffleArray(q.answers);
      question.push(q);
      this.adds = add

    }

    this.setState({ questions: question })
  }

  selectLanguage(str) {
    let q
    if (str === 'eng') {
      q = this.equestions
      this.terms = terms.termE
    }
    if (str === 'ban') {
      q = this.bquestions
      this.fontB = fontBB
      this.fontR = fontBR
      this.terms = terms.termB
      this.acceptBtn = new Image().src = acceptBan


    }
    this.setState({ language: str, questions: q, conditionPage: true })
  }


  async postname(lvl) {

    // console.log(window.FBInstant.player.getName(),this.playerId,this.playerName);
    let frombody = new FormData()
    frombody.append('userId', window.FBInstant.player.getID())
    frombody.append('userName', window.FBInstant.player.getName())
    frombody.append('time', Date.now())
    frombody.append('level', lvl)
    // console.log("ff",frombody);
    fetch(scriptUrl, { method: 'POST', body: frombody })
      .then()
      .catch(error => console.log('Error!', error.message))

  }
  languageScreen() {
    return (
      <div style={{
        display: "flex", minHeight: "100vh", flexDirection: 'column', backgroundImage: `url(${this.languageImg})`,
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
        backgroundColor: imageBackgroundColor,
        backgroundRepeat: 'no-repeat', justifyContent: 'flex-end'
      }}>

        <div style={{
          display: "flex", minHeight: "30%"
          , minWidth: "100%"
          , justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: window.innerWidth / window.innerHeight < .5 ? "15vh" : "8vh",
          flexDirection: 'column'
        }}>

          <img src={this.logo} alt=" " style={{ width: "35%", height: "35%", marginBottom: '25px' }} />
          <div style={{ width: '100%' }}>
            <p style={{
              color: "#FCB314", fontWeight: 'bold', alignItems: 'left', textAlign: 'left', marginBottom: "4px",
              fontFamily: this.fontB, fontSize: 'x-large', paddingLeft: '17%'
            }}>Select Language</p>
          </div>
          <div onClick={() => this.selectLanguage("ban")} style={{
            display: "flex", backgroundColor: "white", height: "40px", border: 'solid', borderRadius: this.broderR, borderWidth: 1,
            justifyContent: 'Left',
            minWidth: "77%",
            alignItems: "center", cursor: "pointer"
          }}>
            <text style={{ fontFamily: fontBR, color: 'black', fontWeight: '600', fontSize: 'x-large', paddingLeft: '7%' }}>বাংলা</text>
          </div>
          <div onClick={() => this.selectLanguage("eng")} style={{
            display: "flex", backgroundColor: "white", height: "40px", border: 'solid', borderRadius: this.broderR, borderWidth: 1,
            marginTop: '20px',
            minWidth: "77%",
            justifyContent: 'Left',
            alignItems: "center",
            marginBottom: "38px", cursor: "pointer"
          }}>
            <text style={{ fontFamily: this.fontR, color: 'black', fontWeight: '400', fontSize: 'x-large', paddingLeft: '7%' }}>English</text>
          </div>
        </div>
      </div>
    )
  }

  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }


  palyAgain() {
    this.setState({ level: 0, showAdds: false, lvl5Modal: false, tryAgain: false })
  }

  tryScreen() {
    return (
      <div style={{
        display: "flex", minHeight: "100vh", flexDirection: 'column', backgroundImage: `url(${this.play})`,
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
        backgroundColor: imageBackgroundColor,
        backgroundRepeat: 'no-repeat', alignItems: 'center'
      }}>

        <div style={{
          display: "flex", minHeight: "100vh"
          , minWidth: "100%",
          alignItems: 'center',
          justifyContent: 'center'
        }}>

        </div>

        <div style={{
          display: "flex",
          flexDirection: "row",
          width: "100vw",
          justifyContent: 'space-around',
          marginTop: '20px',
          height: '40px',
          position: "absolute",
          bottom: '30vh'
        }}>
          <div onClick={() => window.FBInstant.quit()} style={{
            display: "flex", minHeight: "40px", border: 'solid', borderRadius: this.broderR, borderWidth: 1,
            justifyContent: 'center',
            minWidth: "30%",
            backgroundColor: 'white',
            alignItems: "center", cursor: "pointer"
          }}>
            <text style={{ fontFamily: this.fontR, color: 'black', fontWeight: '700', fontSize: '22px' }}>{this.terms.quit}</text>
          </div>
          <div onClick={() => this.palyAgain()} style={{
            display: "flex", minHeight: "40px", border: 'solid', borderRadius: this.broderR, borderWidth: 1,
            minWidth: "30%",
            justifyContent: 'center',
            backgroundColor: '#FCB314',
            alignItems: "center", cursor: "pointer"
          }}>
            <text style={{ fontFamily: this.fontR, color: 'black', fontWeight: '700', fontSize: '22px', padding: '3px' }}>{this.terms.playAgain}</text>
          </div>
        </div>


      </div>
    )

  }
  
  termsScreen() {
    let heightinvh = window.innerWidth / window.innerHeight < .5 ? "56vh" : "66vh"
    let marginvh = window.innerWidth / window.innerHeight > .5 ? "11vh" : "7vh"
    this.tt=this.terms.list ?this.terms.list:[];
    return (
      <div style={{
        display: "flex", flexDirection: 'column', backgroundImage: `url(${this.trm})`,
        backgroundPosition: 'center',
        height: '100vh',
        backgroundSize: '100%',
        backgroundColor: imageBackgroundColor,
        backgroundRepeat: 'no-repeat',
        justifyContent: 'flex-end', alignItems: 'center'
      }}>
        <div style={{
          display: "flex", flexDirection: 'column', backgroundImage: `url(${this.trmL})`,
          backgroundPosition: 'center',
          height: '100vh',
          backgroundSize: '80% 40%',
          backgroundRepeat: 'no-repeat', alignItems: 'center'
        }}>
          <div style={{ height: "100%", display: "flex", flexDirection: 'column', alignItems: "center", justifyContent: "center" }}>
            <div style={
              {
                display: "flex", height: heightinvh, flexDirection: 'column', width: '90%', justifyContent: 'flex-start',
                backgroundColor: "rgba(255,255,255,0.8)", overflow: 'auto', alignItems: 'center', marginTop: marginvh
              }
            }>
              <text style={
                {
                  fontFamily: this.fontB, fontWeight: 900, marginBottom: "5px", marginTop: '10px', fontSize: 'x-large'
                }
              }>{this.terms.title}</text>
              <ul >
                {this.terms.list.map(item => (
                  <li  style={{ paddingRight: '10px', marginBottom: '5px', fontFamily: this.fontR ,fontWeight: 400, fontSize:'14.5pt'}}>{item} </li>
                ))}
              </ul>
              
              
            </div>

            <img src={this.acceptBtn} alt=" " style={{ width: "60%", height: "60px", marginBottom: '0vh', marginTop: '15px' }} onClick={() => this.setState({ conditionPage: false })} />
          </div>
        </div>
      </div>
    )
  }
  
  modal() {

    let img

    if (this.state.level >= this.state.questions.length) {
      img = this.win
      // this.postname("won")
    } else {
      img = this.adds[0];


    }
    return (
      <div style={{
        display: "flex", minHeight: "100vh", flexDirection: 'column', backgroundImage: `url(${img})`,
        backgroundPosition: 'center',
        backgroundSize: "100%",
        backgroundColor: imageBackgroundColor,
        backgroundRepeat: 'no-repeat', justifyContent: "center", alignItems: 'center'
      }}>
      </div>
    )
  }



  showImg(img) {
    if (img) {
      return (<div style={{
        width: '100%',
        alignItems: 'center', display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end', marginBottom: "5px",
        // marginTop: '33px'
      }}>

        <img src={img} alt="Logo" style={{
          width: '64%',
        }} />
      </div>)
    }
    return (
      <div style={{ marginBottom: "0px", height: "1px" }}>
      </div>
    )

  }


  handelAns = (str) => {
    // thicolorChange
    if (this.state.colorChange) return
    this.answerGiven = str;
    this.setState({ colorChange: true })
    setTimeout(
      () => {
        if (str === this.state.questions[this.state.level].answer) {
          this.funLvl(true);
        } else {
          // const ll = this.state.level
          // this.postname(ll)
          // this.funLvl(false);
          // this.postname(this.state.level);
          this.funLvl(true);


        }
      },
      answerColorDuration
    );

  }




  funLvl = (boo) => {
    // console.log(this.state.level);
    if (boo) {
      if (this.state.level === this.state.questions.length - 1) {this.postname("won")
      setTimeout(
        () => {
          this.setState({ tryAgain: true });
          this.common()
        },
        addduration);
    }
      if (addPoition.includes(this.state.level)) {
        this.setState({ showAdds: false, colorChange: false })
        setTimeout(
          () => {
            this.setState({ level: this.state.level + 1, showAdds: false });
            this.adds.shift();
          },
          addduration
        );
      }
      else if (this.state.level === 40) {
        this.setState({ lvl5Modal: true, colorChange: false })
        setTimeout(
          () => {
            this.setState({ level: this.state.level + 1, lvl5Modal: false });
          },
          lvl5duretion
        );
      }
      else {
        this.setState({ level: this.state.level + 1, colorChange: false })
        // console.log(this.state.level, "kk");
      }

    } else {
      this.setState({ showAdds: true, colorChange: false })
      setTimeout(
        () => {
          this.setState({ showAdds: false, tryAgain: true });
          this.common()
        },
        addduration
      );

    }
  }


  ansBtn(txt, txt1) {
    let bgc = this.state.colorChange ? txt === this.state.questions[this.state.level].answer ? greenColor : txt === this.answerGiven ? redColor : 'white' : 'white'
    let fgc = this.state.colorChange ? txt === this.state.questions[this.state.level].answer ? 'white' : txt === this.answerGiven ? 'white' : 'black' : 'black'
    const button = {
      borderTopRightRadius: this.broderR, borderBottomRightRadius: this.broderR, backgroundColor: bgc, alignItems: 'center', width: "62%", height: "42px",
      marginTop: "13px", display: "flex", justifyContent: 'center', cursor: "pointer"
    };
    return (
      <div onClick={() => this.handelAns(txt)} style={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
        <div style={{
          borderTopLeftRadius: this.broderR, borderBottomLeftRadius: this.broderR, backgroundColor: ansOptionColor, alignItems: 'center', width: "10%", height: "42px",
          marginTop: "13px", justifyContent: 'center', display: "flex", cursor: "pointer"
        }} >
          <p style={{ fontWeight: 'bold', fontFamily: fontEB, color: 'white', fontSize: 'xx-large' }}>{txt1}</p>
        </div>
        <div style={button} >
          <p style={{ fontWeight: '600', fontFamily: this.fontR, color: fgc, lineHeight: "120%", fontSize: "12.5pt", padding: "5px", paddingTop: "3px", paddingBottom: '3px' }}>{txt}</p>
        </div>
      </div>
    )
  }
  render() {
    let prop = this.state.questions[this.state.level <= 0 ? 0 : this.state.level]
    let backd = this.img[0]
    const grid = {
      display: "flex", textAlign: "center", flexDirection: "column",
      marginTop: "10px", marginBottom: this.marginvh,
      justifyContent: "center",
      height: "100%", width: "100vw"
    }

    return (
      <div style={{
        display: "flex", minHeight: "100vh", flexDirection: 'column', justifyContent: 'center'
      }}>
        {this.state.conditionPage ? this.termsScreen() : this.state.tryAgain ? this.tryScreen() : this.state.showAdds ? this.modal() :
          this.state.level >= this.state.questions.length ? this.modal() :
            this.state.language && this.state.level >= 0 ?
              <div style={{
                backgroundImage: `url(${backd})`,
                backgroundPosition: 'center',
                backgroundColor: imageBackgroundColor,
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                display: "flex", minHeight: "100vh", flexDirection: 'column', justifyContent: 'flex-end',
              }}>
                {/* <div style={{ height: "100%", width: "100%", position: 'absolute' }}> */}
                <div style={grid}>
                  {this.showImg(prop.image ? prop.image : false)}
                  <text style={{
                    color: "white", fontFamily: this.fontB, textAlign: "center", fontWeight: '700',
                    fontSize: 'x-large', marginTop: '15px', marginBottom: "25px", paddingLeft: "8%",
                    lineHeight: this.fontB == 'SutonnyMJ Bold' ? "120%" : "100%", paddingRight: "8%"
                  }}>{prop.question}</text>
                  {this.ansBtn(prop.answers[0], "A")}{this.ansBtn(prop.answers[1], "B")}{this.ansBtn(prop.answers[2], "C")}{this.ansBtn(prop.answers[3], "D")}
                </div>
                {/* </div> */}

              </div>
              : this.languageScreen()}
      </div>


    )
  }
}

export default Temp;

