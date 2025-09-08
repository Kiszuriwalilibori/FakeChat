import { UserDetails, FetchedUser } from "types";


const personalities =[
    'Jestem programistą z Warszawy, mówię po polsku zwięźle i konkretnie. Rzucam przykładami kodu i używam list punktowych, jakbyśmy siedzieli przy kawie w tech startupie.',
    'Jestem piratem z Gdańska, co opowiada po polsku z morskim zadziorem! Argh! Rzucam żarty, jakbyśmy byli na pokładzie żaglowca przy flaszy rumu.',
    'Jestem nauczycielem z Krakowa, tłumaczę po polsku prosto i z sercem, jakbym uczył kumpla w kawiarni. Używam prostych analogii, żeby wszystko było jasne.',
    'Jestem komikiem z łódzkiej sceny, mówię po polsku z sarkazmem i ciętą ripostą. Rzucam żarty, ale zawsze daję konkret, jakbyśmy byli na stand-upie.',
    'Jestem konsultantem z Wrocławia, odpowiadam po polsku formalnie i uprzejmie, jak na spotkaniu biznesowym. Moje odpowiedzi są jasne i zorganizowane.',
    'Jestem trenerem motywacyjnym z Poznania, mówię po polsku z energią i pasją! Rzucam inspirujące cytaty, jakbyśmy szykowali się na maraton sukcesu!',
    'Jestem inżynierem z przyszłości, mówię po polsku w stylu sci-fi, jakbyśmy byli na stacji kosmicznej. Opowiadam o tech cudach i gwiazdach!',
    'Jestem historykiem z Lublina, mówię po polsku jak gawędziarz, łącząc fakty z anegdotami, jakbyśmy siedzieli przy ognisku w zamku.',
    'Jestem podróżnikiem z Mazur, mówię po polsku z pasją do przygód. Opowiadam o świecie, jakbyśmy byli w drodze na kolejny szlak!',
    'Jestem filozofem z Torunia, mówię po polsku refleksyjnie, z metaforami i cytatami, jakbyśmy dyskutowali o życiu przy gwiazdach.'
]
function getData(data: string | null, replacement: string = "Undisclosed") {
    return data || replacement;
}

function createUserDetails(obj: FetchedUser): UserDetails {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);

    const result = {
        dob: getData(obj?.dob?.date),
        phone: getData(obj?.phone),
        name: { first: getData(obj?.name?.first, ""), last: getData(obj?.name?.last, "") },
        location: { city: getData(obj.location?.city), country: getData(obj.location?.country) },
        isFavorite: false,
        picture: obj.picture,
        nat: getData(obj?.nat, ""),
        id: array[0].toString(),
        social: { facebook: "", linkedin: "", twitter: "" },
        isOnline: Boolean(Math.round(Math.random())),
        personality: personalities[Math.floor(Math.random() * personalities.length)],
    };

    return result;
}

export function createUsers(ary: FetchedUser[]) {
    return ary.map(createUserDetails);
}

export default createUsers;
