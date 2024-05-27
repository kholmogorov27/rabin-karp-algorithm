import {rabinKarpAlgorithm} from "./counter.ts";

interface Report {
    collisions: number,
    textSize: number,
    patternSize: number,
    isModOptimized: boolean
}

function reportFactory(collisions: number, textSize: number, patternSize: number, isModOptimized: boolean): Report {
    return {
        collisions,
        textSize,
        patternSize,
        isModOptimized,
    }
}

const TEXT_SAMPLE = `На краю дороги стоял дуб. Вероятно, в десять раз старше берез, составлявших лес, он был в десять раз толще, и в два раза выше каждой березы. Это был огромный, в два обхвата дуб, с обломанными, давно, видно, суками и с обломанной корой, заросшей старыми болячками. С огромными своими неуклюже, несимметрично растопыренными корявыми руками и пальцами, он старым, сердитым и презрительным уродом стоял между улыбающимися березами. Только он один не хотел подчиняться обаянию весны и не хотел видеть ни весны, ни солнца.
«Весна, и любовь, и счастие! — как будто говорил этот дуб. — И как не надоест вам все один и тот же глупый бессмысленный обман! Все одно и то же, и все обман! Нет ни весны, ни солнца, ни счастья. Вон смотрите, сидят задавленные мертвые ели, всегда одинакие, и вон и я растопырил свои обломанные, ободранные пальцы, где ни выросли они — из спины, из боков. Как выросли — так и стою, и не верю вашим надеждам и обманам» .
Князь Андрей несколько раз оглянулся на этот дуб, проезжая по лесу, как будто он чего-то ждал от него. Цветы и трава были и под дубом, но он все так же, хмурясь, неподвижно, уродливо и упорно, стоял посреди их.
«Да, он прав, тысячу раз прав этот дуб, — думал князь Андрей, — пускай другие, молодые, вновь поддаются на этот обман, а мы знаем жизнь, — наша жизнь кончена! » Целый новый ряд мыслей безнадежных, но грустно-приятных в связи с этим дубом возник в душе князя Андрея. Во время этого путешествия он как будто вновь обдумал всю свою жизнь и пришел к тому же прежнему, успокоительному и безнадежному, заключению, что ему начинать ничего было не надо, что он должен доживать свою жизнь, не делая зла, не тревожась и ничего не желая.`
const PATTERN_SAMPLE = `то`

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <p>
        TEXT: <br> <textarea style="width:500px; height:300px;" id="text">${TEXT_SAMPLE}</textarea>
    </p>
    <p>
        PATTERN: <br> <textarea style="width:500px; height:300px;" id="pattern">${PATTERN_SAMPLE}</textarea>
    </p>
    <p>
        RESULTS: <br> <span id="results"></span>
    </p>
    <p>
        <button id="test-activation-button">START TEST (results in console)</button>
    </p>
`

const textInputElement = document.getElementById("text")!;
const patternInputElement = document.getElementById("pattern")!;
const resultsElement = document.getElementById("results")!;
const testActivationButton = document.getElementById("test-activation-button")!;

textInputElement.addEventListener("input", calculate);
patternInputElement.addEventListener("input", calculate);
testActivationButton.addEventListener("click", test)
calculate()

function calculate(): void {
    const text = (textInputElement as HTMLTextAreaElement).value
    const pattern = (patternInputElement as HTMLTextAreaElement).value

    const result = rabinKarpAlgorithm(text, pattern) as number [];
    resultsElement.innerText = result.join(', ')
}

function test(): void {
    const results: Report[] = []

    for (let textSize = 1000; textSize <= 20000; textSize += 1000) {
        for (let patternSize = 2; patternSize <= 10; patternSize += 2) {
            const text = randomText(textSize)
            const pattern = randomText(patternSize)

            results.push(reportFactory(rabinKarpAlgorithm(text, pattern, true) as number, textSize, patternSize, true))
            results.push(reportFactory(rabinKarpAlgorithm(text, pattern, true, 13) as number, textSize, patternSize, false))
        }
    }

    console.log(results)
}

function randomText(length: number): string {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz"
    let result = ''
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}