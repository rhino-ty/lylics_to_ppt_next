import Head from "next/head";
import pptxgen from "pptxgenjs";

type SlideProps = {
  pptx: pptxgen;
  lines: string[];
  startIndex: number;
  endIndex: number;
  fontSize: number;
  maxLines: number;
};

export default function Home() {
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
    const fontSize = event.target.fontSize.value || 50;
    const maxLines = event.target.maxLines.value || 4;
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
        <p>가사를 엔터공백 없이 입력하면 입력한 줄 수마다 PPT 섹션으로 만들어져요!</p>
        <p>첫 줄은 파일 이름으로 나옵니다!</p>
        <form onSubmit={handleFormSubmit}>
          <textarea name="lyrics" rows={10}></textarea>
          <div>
            <label htmlFor="fontSize">폰트 사이즈:</label>
            <input type="number" name="fontSize" defaultValue="50" />
          </div>
          <div>
            <label htmlFor="maxLines">PPT 한 섹션에 들어갈 가사 줄 수:</label>
            <input type="number" name="maxLines" defaultValue="4" />
          </div>
          <button type="submit">PPT 생성</button>
        </form>
      </div>
    </div>
  );
}
