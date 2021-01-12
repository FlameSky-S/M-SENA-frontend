<template>
  <div class="Wiki-container">
    <header>
      <h1>MELD: Multimodal EmotionLines Dataset</h1>
      <p>A dataset for Emotion Recognition in Multiparty Conversations</p>
      <p class="view">
        <a href="https://github.com/declare-lab/MELD/">
          View the Project on GitHub
        </a>
      </p>
      <p class="view">
        <a href="https://arxiv.org/pdf/1810.02508.pdf">Download the paper</a>
      </p>
      <ul>
        <li>
          <a
            href="http://web.eecs.umich.edu/~mihalcea/downloads/MELD.Raw.tar.gz"
          >
            Download
            <strong>Raw Data</strong>
          </a>
        </li>
        <li>
          <a
            href="http://web.eecs.umich.edu/~mihalcea/downloads/MELD.Features.Models.tar.gz"
          >
            Download
            <strong>Features</strong>
          </a>
        </li>
        <li>
          <a href="https://github.com/declare-lab/MELD/">
            Fork On
            <strong>GitHub</strong>
          </a>
        </li>
      </ul>
    </header>
    <section>
      <p>
        Multimodal EmotionLines Dataset (MELD) has been created by enhancing and
        extending EmotionLines dataset. MELD contains the same dialogue
        instances available in EmotionLines, but it also encompasses audio and
        visual modality along with text. MELD has more than 1400 dialogues and
        13000 utterances from Friends TV series. Multiple speakers participated
        in the dialogues. Each utterance in a dialogue has been labeled by any
        of these seven emotions -- Anger, Disgust, Sadness, Joy, Neutral,
        Surprise and Fear. MELD also has sentiment (positive, negative and
        neutral) annotation for each utterance.
      </p>
      <p>
        <br />
      </p>

      <h2>Example dialogue</h2>
      <!-- <img src="emotion_shift.jpeg" alt="Example">-->
      <img
        id="myImg"
        src="https://affective-meld.github.io/emotion_shift.jpeg"
        alt="Example dialogue"
        style="width: 100%; max-width: 500px"
      />

      <!-- The Modal -->
      <div id="myModal" class="modal">
        <span class="close">&times;</span>
        <img id="img01" class="modal-content" />
        <div id="caption"></div>
      </div>
      <br />
      <br />
      <h2>Dataset statistics</h2>
      <!--  <img src="sc1.png" alt="Stat1">
        <img src="sc2.png" alt="Stat2">
        <br>
        <img src="sc3.png" alt="Stat3">-->
      <img src="https://affective-meld.github.io/sc4.png" alt="Stat4" />
      <h2>Citation</h2>
      <p>
        Please cite the following papers if you use this dataset in your work.
      </p>
      <br />
      <pre>S. Poria, D. Hazarika, N. Majumder, G. Naik, R. Mihalcea,<br>E. Cambria. MELD: A Multimodal Multi-Party Dataset<br>for Emotion Recognition in Conversation. (2018)
        </pre>
      <pre>Chen, S.Y., Hsu, C.C., Kuo, C.C. and Ku, L.W.<br>EmotionLines: An Emotion Corpus of Multi-Party<br>Conversations. arXiv preprint arXiv:1802.08379 (2018).
        </pre>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'Wiki',
    components: {},
    data() {
      return {}
    },
    created() {},
    mounted() {
      // Get the modal
      var modal = document.getElementById('myModal')
      // Get the image and insert it inside the modal - use its "alt" text as a caption

      var modalImg = document.getElementById('img01')
      var captionText = document.getElementById('caption')
      var img = document.getElementById('myImg')
      img.onclick = function () {
        modal.style.display = 'block'
        modalImg.src = this.src
        captionText.innerHTML = this.alt
      }
      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName('close')[0]

      // When the user clicks on <span> (x), close the modal
      span.onclick = function () {
        modal.style.display = 'none'
      }
    },
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .Wiki-container {
    width: 960px;
    height: 1440px;
    padding: 50px;
    margin: 0 auto;
    font: 14px/1.5 -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Arial,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-weight: 400;
    color: #595959;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 20px;
    color: #222;
  }

  p,
  ul,
  ol,
  table,
  pre,
  dl {
    margin: 0 0 20px;
  }

  h1,
  h2,
  h3 {
    line-height: 1.1;
  }

  h1 {
    font-size: 28px;
    font-weight: 500;
  }

  h2 {
    font-weight: 500;
    color: #393939;
  }

  h3,
  h4,
  h5,
  h6 {
    font-weight: 500;
    color: #494949;
  }

  a {
    color: #39c;
    text-decoration: none;
  }

  a:hover {
    color: #069;
  }

  a small {
    display: block;
    margin-top: -0.3em;
    font-size: 11px;
    color: #777;
  }

  a:hover small {
    color: #777;
  }

  blockquote {
    padding: 0 0 0 20px;
    margin: 0;
    font-style: italic;
    border-left: 1px solid #e5e5e5;
  }

  code,
  pre {
    font-family: Monaco, Bitstream Vera Sans Mono, Lucida Console, Terminal,
      Consolas, Liberation Mono, DejaVu Sans Mono, Courier New, monospace;
    color: #333;
  }

  pre {
    padding: 8px 15px;
    overflow-x: auto;
    background: #f8f8f8;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 5px 10px;
    text-align: left;
    border-bottom: 1px solid #e5e5e5;
  }

  dt {
    font-weight: 500;
    color: #444;
  }

  th {
    color: #444;
  }

  img {
    max-width: 100%;
  }

  header {
    position: fixed;
    float: left;
    width: 270px;
    -webkit-font-smoothing: subpixel-antialiased;
  }

  header ul {
    width: 270px;
    height: 40px;
    padding: 0;
    list-style: none;
    background: #f4f4f4;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
  }

  header li {
    float: left;
    width: 89px;
    height: 40px;
    border-right: 1px solid #e0e0e0;
  }

  header li:first-child a {
    border-radius: 5px 0 0 5px;
  }

  header li:last-child a {
    border-radius: 0 5px 5px 0;
  }

  header ul a {
    display: block;
    height: 34px;
    padding-top: 6px;
    font-size: 11px;
    line-height: 1;
    color: #999;
    text-align: center;
  }

  header ul a:hover {
    color: #999;
  }

  header ul a:active {
    background-color: #f0f0f0;
  }

  strong {
    font-weight: 500;
    color: #222;
  }

  header ul li + li + li {
    width: 89px;
    border-right: none;
  }

  header ul a strong {
    display: block;
    font-size: 14px;
    color: #222;
  }

  section {
    float: right;
    width: 500px;
    padding-bottom: 50px;
  }

  small {
    font-size: 11px;
  }

  hr {
    height: 1px;
    margin: 0 0 20px;
    background: #e5e5e5;
    border: 0;
  }

  @media print, screen and (max-width: 1400px) {
    div.Wiki-container {
      width: auto;
      height: 1900px;
      margin: 0;
      font: 14px/1.5 -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
        'Segoe UI Symbol';
      font-weight: 400;
      color: #595959;
    }

    header,
    section,
    footer {
      position: static;
      float: none;
      width: auto;
    }

    header {
      padding-right: 320px;
    }

    section {
      padding: 20px 0;
      margin: 0 0 20px;
      border: 1px solid #e5e5e5;
      border-width: 1px 0;
    }

    header a small {
      display: inline;
    }

    header ul {
      position: absolute;
      top: 52px;
      right: 50px;
    }
  }

  @media print, screen and (max-width: 720px) {
    body {
      word-wrap: break-word;
    }

    header {
      padding: 0;
    }

    header ul,
    header p.view {
      position: static;
    }

    pre,
    code {
      word-wrap: normal;
    }
  }

  @media print, screen and (max-width: 480px) {
    body {
      padding: 15px;
    }

    header ul {
      width: 99%;
    }

    header li,
    header ul li + li + li {
      width: 33%;
    }
  }

  @media print {
    body {
      padding: 0.4in;
      font-size: 12pt;
      color: #444;
    }
  }

  /* Style the Image Used to Trigger the Modal */
  #myImg {
    cursor: pointer;
    border-radius: 5px;
    transition: 0.3s;
  }

  #myImg:hover {
    opacity: 0.7;
  }

  /* The Modal (background) */
  .modal {
    position: fixed; /* Stay in place */
    top: 18%;
    left: 20%;
    z-index: 1; /* Sit on top */
    display: none; /* Hidden by default */
    width: 60%; /* Full width */
    height: 64%; /* Full height */
    padding-top: 100px; /* Location of the box */
    background-color: #ffffffe6; /* Black w/ opacity */
  }

  /* Modal Content (Image) */
  .modal-content {
    display: block;
    width: 100%;
    max-width: 1700px;
    margin: auto;
  }

  /* Caption of Modal Image (Image Text) - Same Width as the Image */
  #caption {
    display: block;
    width: 80%;
    max-width: 700px;
    height: 150px;
    padding: 10px 0;
    margin: auto;
    color: #ccc;
    text-align: center;
  }

  /* Add Animation - Zoom in the Modal */
  .modal-content,
  #caption {
    animation-name: zoom;
    animation-duration: 0.6s;
  }

  @keyframes zoom {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }

  /* The Close Button */
  .close {
    position: absolute;
    top: 15px;
    right: 35px;
    font-size: 40px;
    font-weight: bold;
    color: #000000;
    transition: 0.3s;
  }

  .close:hover,
  .close:focus {
    color: #bbb;
    text-decoration: none;
    cursor: pointer;
  }

  /* 100% Image Width on Smaller Screens */
  @media only screen and (max-width: 700px) {
    .modal-content {
      width: 100%;
    }
  }
</style>
