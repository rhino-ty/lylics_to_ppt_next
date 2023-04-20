import Head from "next/head";
import pptxgen from "pptxgenjs";
import { useState } from "react";

type SlideProps = {
  pptx: pptxgen;
  lines: string[];
  startIndex: number;
  endIndex: number;
  fontSize: number;
  maxLines: number;
};

export default function Home() {
  const [fontSize, setFontSize] = useState<number>(50);
  const [maxLines, setMaxLines] = useState<number>(4);

  const addSlide = ({ pptx, lines, startIndex, endIndex, fontSize, maxLines }: SlideProps) => {
    const slide = pptx.addSlide();
    const text = lines.slice(startIndex, endIndex).join("\n");
    slide.background = { color: "000000" };
    slide.color = "ffffff";
    slide.addText([{ text: text, options: { fontSize: fontSize, align: "center" } }], {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 6.5,
    });
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    const lyrics = event.target.lyrics.value;
    if (!lyrics) {
      alert("가사를 입력해주세요!");
      return;
    }
    const lines = lyrics.split("\n");
    const pptx = new pptxgen();
    pptx.layout = "LAYOUT_4x3";
    pptx.theme = { bodyFontFace: "Nanum Gothic" };
    for (let i = 0; i < lines.length; i += maxLines) {
      addSlide({
        pptx,
        lines,
        startIndex: i,
        endIndex: i + maxLines,
        fontSize: fontSize,
        maxLines: maxLines,
      });
    }
    pptx.writeFile(lines[0]);
  };

  return (
    <div>
      <Head>
        <title>가사 PPT</title>
      </Head>

      <div className="container">
        <h1>PPT로 만들어보세요!</h1>
        <p>가사를 입력하면 입력한 줄 수마다 PPT 페이지로 만들어져요.</p>
        <form onSubmit={handleFormSubmit}>
          <span>첫 줄은 파일 이름으로 나옵니다!</span>
          <textarea name="lyrics" rows={10}></textarea>
          <div className="option-container">
            <div>
              <label htmlFor="fontSize">폰트 사이즈 :</label>
              <input
                type="number"
                name="fontSize"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="maxLines">한 페이지에 들어갈 가사 줄 수 : </label>
              <input
                type="number"
                name="maxLines"
                value={maxLines}
                onChange={(e) => setMaxLines(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="mt-3">가사 한줄 한줄이 너무 길다 싶으면 임의로 줄바꿈을 해주세요!</div>
          <br />
          <button type="submit">PPT 생성</button>
        </form>
      </div>
    </div>
  );
}
