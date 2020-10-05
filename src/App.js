import React, { Component } from 'react';
import htmlToImage from 'html-to-image';
import ReactDOM from 'react-dom';
import { css } from "@emotion/core";
import MoonLoader from "react-spinners/MoonLoader";
import win from "../src/img/win.png";
import playengC from "../src/img/playengC.png";
import playengNC from "../src/img/playengNC.png";
import playBanC from "../src/img/playBanC.png";
import playBanNC from "../src/img/playBanNC.png";
import skipadd from "../src/img/skipadd.svg";
import share from "../src/img/Share.svg";
import acceptEng from "../src/img/acceptEng.png";
import acceptBan from "../src/img/acceptBan.png";
import play from "../src/img/playAgain.svg";
import logo from "../src/img/logo1.png";
import banglaQ from "../src/banglaqns";
import englishQ from "../src/englishqns";
import language from "./img/ll.svg"
import image from "./img/image.js";
import terms from "./tremand condition.js"
import trm from "./img/trm.svg"
import trmL from "./img/trmL.png"
import ss from "./img/shareback.jpg";
import './App.css';
import { greenColor, broderR, redColor, addPoition, addduration, fontBS, answerColorDuration, imageBackgroundColor, ansOptionColor, scriptUrl, fontER, fontBR, fontEB, fontBB } from "./control.js";
import engToban from './engtoban';
import UIfx from 'uifx';
import right from './mp3/right.mp3';
import wrong from './mp3/wrong.mp3';

const override = css`
  display: block;
  margin: 2 auto;
  border-color: #FCB314;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      colorChange: false,
      questions: [],
      language: '',
      level: 0,
      shareOn: true,
      timer: 15,
      showAdds: false,
      lvl5Modal: false,
      tryAgain: false,
      conditionPage: false,
      isSkip: true,
      shareon1: false,
      propic: null,
      isLoading: false
    };
    this.nextQuestions = []
    this.addTimer = {}
    this.img = image.backImages
    this.adds = []
    this.win = new Image().src = win;
    this.ss = new Image().src = ss;
    this.skipImg = new Image().src = skipadd;
    this.logo = new Image().src = logo;
    this.trm = new Image().src = trm;
    this.fb = new Image().src = share;
    this.trmL = new Image().src = trmL;
    this.languageImg = new Image().src = language;
    this.bquestions = []
    this.banglaQ = banglaQ
    this.englishQ = englishQ
    this.right = null
    this.wrong = null
    this.equestions = []
    this.contextId = null
    this.contextType = null
    this.shareRef = React.createRef();
    this.answerGiven = null
    this.playerName = null
    this.playerPic = null
    this.playerId = null
    this.fontB = fontEB
    this.fontR = fontER
    this.marginvh = 0
    this.intervalId = "jj"
    this.terms = terms.termE
    this.broderR = broderR
    this.acceptBtn = new Image().src = acceptEng
    this.play = null
    this.tt = [];
  }
  async componentDidMount() {
    this.img.forEach((image) => {
      new Image().src = image;
    });

    this.right = await new UIfx(right);
    this.wrong = await new UIfx(wrong);
    this.win = new Image().src = win;
    this.logo = new Image().src = logo;
    this.acceptBtn = new Image().src = acceptEng
    this.trm = new Image().src = trm;
    this.trmL = new Image().src = trmL;
    this.play = new Image().src = play
    this.playengC = new Image().src = playengC
    this.playengNC = new Image().src = playengNC
    this.playbanNC = new Image().src = playBanNC
    this.playbanC = new Image().src = playBanC
    this.languageImg = new Image().src = language;


    const script = document.createElement('script');
    script.src = "https://connect.facebook.net/en_US/fbinstant.6.3.js"
    script.id = "fbinstant"
    document.body.appendChild(script);
    this.marginvh = window.innerWidth / window.innerHeight < .5 ? "21vh" : "17.5vh"

    let bquestion = []
    let equestion = []
    let add = []
    let rand = []

    this.banglaQ = await this.shuffleArray(this.banglaQ)
    this.englishQ = await this.shuffleArray(this.englishQ)

    for (let i = 0; rand.length < addPoition.length; i++) {
      let w = Math.floor((Math.random() * 11) + 0)
      if (!rand.includes(w)) {
        rand.push(w)
        let p = image.adds[w]
        let r = new Image().src = p;
        add.push(r)
      }
    }
    rand = []
    for (let i = 0; rand.length < 15; i++) {
      let w = Math.floor((Math.random() * 15) + 0)
      if (!rand.includes(w)) {
        rand.push(w)
        let q = this.banglaQ[w]
        let eq = this.englishQ[w]
        q.answers = await this.shuffleArray(q.answers);
        eq.answers = await this.shuffleArray(eq.answers);
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
              this.contextId = window.FBInstant.context.getID();
              this.contextType = window.FBInstant.context.getType();
              this.playerName = window.FBInstant.player.getName();
              this.playerPic = window.FBInstant.player.getPhoto();
              this.playerId = window.FBInstant.player.getID();
            });
        }
        );

    }

  }

  timerFunction() {
    this.setState({ timer: 15 })
    this.intervalId = setInterval(() => {
      let o = this.state.timer - 1
      if (o <= 0) {
        clearInterval(this.intervalId)
        if (!this.state.tryAgain) {
          this.wrong.play(1.0)
          this.funLvl(false)
        }
        return
      }
      this.setState({ timer: o });
    }, 1000);

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
    qu = await this.shuffleArray(qu)
    let rand = []
    for (let i = 0; rand.length < addPoition.length; i++) {
      let w = Math.floor((Math.random() * 11) + 0)
      if (!rand.includes(w)) {
        rand.push(w)
        let p = image.adds[w]
        let r = new Image().src = p;
        add.push(r)
      }
    }

    rand = []
    for (let i = 0; rand.length < 15; i++) {
      let w = Math.floor((Math.random() * 15) + 0)
      if (!rand.includes(w)) {
        rand.push(w)
        let q = qu[w]
        q.answers = await this.shuffleArray(q.answers);
        question.push(q);
      }
    }
    this.adds = add
    this.nextQuestions = question

    // this.setState({ questions: question })
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

    let frombody = new FormData()
    frombody.append('userId', window.FBInstant.player.getID())
    frombody.append('userName', window.FBInstant.player.getName())
    frombody.append('time', Date.now())
    frombody.append('level', this.state.score)
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


  async palyAgain() {
    if (this.state.isLoading) return
    clearInterval(this.intervalId)
    this.isSkip = true
    this.setState({ isLoading: true })
    await this.common()
    // this.setState({ isLoading: false })
    setTimeout(
      () => {
        this.setState({ level: 0, score: 0, isLoading: false, showAdds: false, isLoading: false, colorChange: false, tryAgain: false, isSkip: true, questions: this.nextQuestions })
        this.timerFunction()
      }, 1000
    )

  }

  tryScreen() {
    const playy = this.state.score >= 15 ? this.state.language === "eng" ? this.playengC : this.playbanC : this.state.language === "eng" ? this.playengNC : this.playbanNC
    let scoreStr = this.state.language === 'ban' ? `${engToban(this.state.score)}/` : `${this.state.score}/`
    scoreStr = this.state.language === 'ban' ? scoreStr.padStart(3, "০") : scoreStr.padStart(3, "0")
    const markStr = this.state.language === 'ban' ? '১৫' : '15'
    let tt = `${this.state.score}/15`
    tt = tt.padStart(5, "0")
    return (


      <div ref={this.shareRef} style={{
        display: "flex", minHeight: "100vh", flexDirection: 'column', backgroundImage: `url(${playy})`,
        backgroundPosition: 'center',
        backgroundSize: '100%',
        backgroundColor: imageBackgroundColor,
        justifyContent: "center",
        backgroundRepeat: 'no-repeat', alignItems: 'center'
      }}>

        <MoonLoader
          css={override}
          size={100}
          color={"#FCB314"}
          loading={this.state.isLoading}
        />


        { this.state.shareOn ? <div style={{
          display: "flex",
          flexDirection: "row",
          width: "100vw",
          justifyContent: 'space-around',
          marginTop: '20px',
          height: '40px',
          position: "absolute",
          bottom: this.state.score < 15 ? window.innerWidth / window.innerHeight < .5 ? "19vh" : "12vh" : window.innerWidth / window.innerHeight < .5 ? "18vh" : "12vh"
        }}>
          <div onClick={() => {
            if (this.state.isLoading) return
            window.FBInstant.quit()
          }} style={{
            display: "flex", minHeight: "35px", border: 'solid', borderRadius: this.broderR, borderWidth: 1,
            justifyContent: 'center',
            minWidth: "30%",
            backgroundColor: 'white',
            alignItems: "center", cursor: "pointer"
          }}>
            <text style={{ fontFamily: this.fontB, color: 'black', fontWeight: '300', fontSize: '18px' }}>{this.terms.quit}</text>
          </div>
          <div onClick={() => this.palyAgain()} style={{
            display: "flex", minHeight: "35px", border: 'solid', borderRadius: this.broderR, borderWidth: 1,
            minWidth: "30%",
            justifyContent: 'center',
            backgroundColor: '#FCB314',
            alignItems: "center", cursor: "pointer"
          }}>
            <text style={{ fontFamily: this.fontB, color: 'black', fontWeight: '300', fontSize: '18px', padding: '3px' }}>{this.terms.playAgain}</text>
          </div>
        </div> : null}

        { this.state.shareOn ? <div style={{
          display: "flex",
          alignItems: "center",
          width: "100vw",
          justifyContent: 'center',
          marginTop: '20px',
          height: '40px',
          flexDirection: 'column',
          position: "absolute",
          bottom: this.state.score < 15 ? window.innerWidth / window.innerHeight < .5 ? "23vh" : "18vh" : window.innerWidth / window.innerHeight < .5 ? "23vh" : "18vh"
        }}>

          <img onClick={() => this.shareOnthis()} src={this.fb} alt="" style={{ height: "45px", marginBottom: "7px" }} />
          <text onClick={() => this.shareOnthis()} style={{ fontFamily: this.fontR, color: 'white', fontWeight: '300', fontSize: '18px' }}>{this.terms.share}</text>

        </div> : null}

        <div style={{
          display: "flex",
          alignItems: "center",
          width: "70vw",
          justifyContent: 'center',
          marginTop: '20px',
          height: '40px',
          flexDirection: 'row',
          position: "absolute",
          bottom: this.state.score < 15 ? window.innerWidth / window.innerHeight < .5 ? "63vh" : "66vh" : window.innerWidth / window.innerHeight < .5 ? "62vh" : "66vh"
        }}>
          {/* <img src={this.trmL} alt="" style={{ border: "solid", borderRadius: 25, marginRight: "20px", borderWidth: 1, borderColor: 'white', hight: "50px", width: "50px" }} /> */}
          <img src={this.state.propic} alt="" style={{ border: "solid", borderRadius: 25, marginRight: "20px", borderWidth: 1, borderColor: 'white', hight: "50px", width: "50px" }} />

          {/* <text style={{ fontFamily: fontEB, color: 'white', fontWeight: '300', fontSize: "xx-large" }}>ALI</text> */}
          <text style={{ fontFamily: fontEB, color: 'white', fontWeight: '300', fontSize: "xx-large" }}>{window.FBInstant.player.getName()}</text>

        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
          width: "100vw",
          justifyContent: 'center',
          marginTop: '20px',
          height: '40px',
          flexDirection: 'row',
          position: "absolute",
          bottom: this.state.score < 15 ? window.innerWidth / window.innerHeight < .5 ? "53vh" : "55vh" : window.innerWidth / window.innerHeight < .5 ? "53vh" : "55vh"
        }}>

          {/* <img onClick={()=>this.shareOnthis()} src={this.fb} alt="" style={{height:"45px", marginBottom:"7px"}}/> */}
          <text style={{ fontFamily: this.state.language === 'ban' ? fontBS : this.fontB, color: 'white', fontWeight: '600', fontSize: '44px' }}>{scoreStr}</text>
          <text style={{ fontFamily: this.state.language === 'ban' ? fontBS : this.fontB, color: this.state.score === 15 ? '#FCB314' : 'white', fontWeight: '600', fontSize: '44px' }}>{markStr}</text>

        </div>
      </div>



    )

  }

  async shareOnthis() {
    if (this.state.isLoading) return
    this.setState({ shareOn: false })

    setTimeout(
      () => {
        this.setState({ isLoading: true, shareOn: true })
      },
      500
    );
    let node = await ReactDOM.findDOMNode(this.shareRef.current)
    try {
      let dataurl = await htmlToImage.toPng(node)
      this.setState({ isLoading: false })
      window.FBInstant.shareAsync({
        intent: 'REQUEST',
        image: dataurl,
        text: "",
        data: { myReplayData: '...' },
      }).then(function () {
        // this.setState({shareOn:true})

      });
    } catch (error) {
      this.setState({ isLoading: false })
      console.log('oops, something went wrong!', error);
    }


  }


  termsScreen() {
    let heightinvh = window.innerWidth / window.innerHeight < .5 ? "56vh" : "66vh"
    let marginvh = window.innerWidth / window.innerHeight > .5 ? "11vh" : "7vh"
    this.tt = this.terms.list ? this.terms.list : [];
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
                  fontFamily: this.fontB, fontWeight: 900, marginBottom: "5px", marginTop: '10px', fontSize: this.state.language === 'eng' ? 'x-large' : 'large',
                }
              }>{this.terms.title}</text>
              <ul >
                {this.terms.list.map(item => (
                  <li style={{ paddingRight: '10px', marginBottom: '5px', fontFamily: this.fontR, fontWeight: 400, fontSize: '14.5pt' }}>{item} </li>
                ))}
              </ul>


            </div>

            <img src={this.acceptBtn} alt=" " style={{ width: "60%", height: "60px", marginBottom: '0vh', marginTop: '15px' }} onClick={() => { this.setState({ conditionPage: false }); this.timerFunction() }} />
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
        backgroundRepeat: 'no-repeat'
      }}>
        {this.state.isSkip ?
          <div style={{ minHeigth: "100vh", minWidth: "100vw", borderRadius: 3, justifyContent: "flex-end", alignItems: "right", display: "flex" }}>
            <img onClick={() => this.skipAdd()} src={this.skipImg} alt=""
              style={{ marginTop: window.innerWidth / window.innerHeight < .5 ? "10vh" : "7vh", marginRight: '1.5vw', height: "25px", width: "80px", justifyContent: 'center', display: "flex", textAlign: "center", alignItems: 'center' }} />
          </div> : <div></div>}
      </div>
    )
  }

  skipAdd() {
    clearInterval(this.addTimer)
    this.setState({ level: this.state.level + 1, showAdds: false, isSkip: false });
    this.timerFunction()
    this.adds.shift();
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
    clearInterval(this.intervalId)
    this.answerGiven = str;
    this.setState({ colorChange: true })
    if (str === this.state.questions[this.state.level].answer) {
      this.setState({ score: this.state.score + 1 })
      this.right.play(1.0)
    } else {
      this.wrong.play(1.0)
      // this.postname(this.state.level);

    }
    setTimeout(
      () => {
        if (str === this.state.questions[this.state.level].answer) {
          this.funLvl(true);
        } else {
          this.funLvl(false);
          // this.postname(this.state.level);

        }
      },
      answerColorDuration
    );

  }




  funLvl = (boo) => {
    if (addPoition.includes(this.state.level)) {
      this.setState({ showAdds: true, colorChange: false, isSkip: true })
      this.addTimer = setInterval(
        () => {
          this.skipAdd();
        },
        addduration
      );
      return
    }
    if (boo) {
      if (this.state.level === this.state.questions.length - 1) {
        if (!this.state.propic) {
          let imagepp = new Image();
          imagepp.crossOrigin = 'anonymous';
          imagepp.src = window.FBInstant.player.getPhoto();
          this.setState({ propic: imagepp })
        }
        this.postname("won")
        this.setState({ tryAgain: true });
        console.log("score ", this.state.score);
      }
      else {
        this.setState({ level: this.state.level + 1, colorChange: false })
        this.timerFunction()

      }

    } else {
      if (this.state.level === this.state.questions.length - 1) {
        this.postname("won")
        if (!this.state.propic) {
          let imagepp = new Image();
          imagepp.crossOrigin = 'anonymous';
          imagepp.src = window.FBInstant.player.getPhoto();
          this.setState({ propic: imagepp })
        }
        this.setState({ tryAgain: true });
        console.log("score ", this.state.score);


      } else {
        this.setState({ level: this.state.level + 1, colorChange: false })
      }
      this.timerFunction()
    }
  }


  ansBtn(txt, txt1) {
    let bgc = this.state.colorChange ? txt === this.state.questions[this.state.level].answer ? greenColor : txt === this.answerGiven ? redColor : 'white' : 'white'
    let fgc = this.state.colorChange ? txt === this.state.questions[this.state.level].answer ? 'white' : txt === this.answerGiven ? 'white' : 'black' : 'black'
    const button = {
      borderTopRightRadius: this.broderR, borderBottomRightRadius: this.broderR, backgroundColor: bgc, alignItems: 'center', width: "62%", height: this.state.language === "eng" ? "42px" : "43px",
      marginTop: "13px", display: "flex", justifyContent: 'center', cursor: "pointer"
    };
    return (
      <div onClick={() => this.handelAns(txt)} style={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
        <div style={{
          borderTopLeftRadius: this.broderR, borderBottomLeftRadius: this.broderR, backgroundColor: ansOptionColor, alignItems: 'center', width: "10%", height: this.state.language === "eng" ? "42px" : "43px",
          marginTop: "13px", justifyContent: 'center', display: "flex", cursor: "pointer"
        }} >
          <p style={{ fontWeight: 'bold', fontFamily: fontEB, color: 'white', fontSize: 'xx-large' }}>{txt1}</p>
        </div>
        <div style={button} >
          <p style={{ fontWeight: '600', fontFamily: this.fontR, color: fgc, lineHeight: this.state.language === 'eng' ? "100%" : "120%", fontSize: "12.0pt", padding: "5px", paddingTop: "3px", paddingBottom: '3px' }}>{txt}</p>
        </div>
      </div>
    )
  }

  load() {
    return (<div style={{
      // backgroundImage: `url(${backd})`,
      // backgroundPosition: 'center',
      // backgroundSize: '100%',
      // backgroundRepeat: 'no-repeat',
      backgroundColor: imageBackgroundColor,
      alignItems: 'center',
      display: "flex", minHeight: "100vh", flexDirection: 'column', justifyContent: 'center',
    }}>
      {/* <Loader
        type="Rings"
        color="yellow"
        height={100}
        width={100}
        timeout={0} //3 secs
      /> */}
    </div>
    )
  }

  render() {
    let prop = this.state.questions[this.state.level <= 0 ? 0 : this.state.level]
    let backd = this.img[this.state.level]
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
        { this.state.conditionPage ? this.termsScreen() : this.state.tryAgain ? this.tryScreen() : this.state.showAdds ? this.modal() :
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
                <div style={grid}>
                  {this.showImg(prop.image ? prop.image : false)}
                  <text style={{
                    color: "white", fontFamily: this.fontB, textAlign: "center", fontWeight: '700',
                    fontSize: prop.image ?'large':'x-large', marginTop: '15px', marginBottom: "23px", paddingLeft: "8%",
                    lineHeight: this.fontB === 'Kalpurush' ? "110%" : "110%", paddingRight: "8%"
                  }}>{prop.question}</text>
                  {this.ansBtn(prop.answers[0], "A")}{this.ansBtn(prop.answers[1], "B")}{this.ansBtn(prop.answers[2], "C")}{this.ansBtn(prop.answers[3], "D")}
                </div>
                <div style={{ minHeigth: "30px", minWidth: "100vw", borderRadius: 3, justifyContent: "center", alignItems: "center", display: "flex", position: "absolute", top: window.innerWidth / window.innerHeight < .5 ? "3vh" : "0vh" }}>
                  <div style={{ minHeight: "30px", minWidth: "30px", borderRadius: 3, backgroundColor: '#FCB314', justifyContent: "center", alignItems: "center", display: "flex" }}>
                    <div style={{ minHeight: "26px", minWidth: "26px", borderRadius: 3, backgroundColor: 'black', justifyContent: "center", alignItems: "center", display: "flex" }}>

                      <text style={{ color: 'black', backgroundColor: '#FCB314', borderRadius: 3, height: "20px", width: "20px", fontFamily: fontEB, fontSize: "large", justifyContent: 'center', display: "flex", textAlign: "center", alignItems: 'center' }}>{this.state.timer}</text>

                    </div>
                  </div>
                </div>
              </div>
              : this.languageScreen()}
      </div>


    )
  }
}

export default App;
