import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Poems = () => {
  const [selectedPoem, setSelectedPoem] = useState<number | null>(null);

  const poems = [
    {
      title: "Зимнее утро",
      year: "1829",
      text: [
        "Мороз и солнце; день чудесный!",
        "Еще ты дремлешь, друг прелестный —",
        "Пора, красавица, проснись:",
        "Открой сомкнуты негой взоры",
        "Навстречу северной Авроры,",
        "Звездою севера явись!",
        "",
        "Вечор, ты помнишь, вьюга злилась,",
        "На мутном небе мгла носилась;",
        "Луна, как бледное пятно,",
        "Сквозь тучи мрачные желтела,",
        "И ты печальная сидела —",
        "А нынче... погляди в окно:",
        "",
        "Под голубыми небесами",
        "Великолепными коврами,",
        "Блестя на солнце, снег лежит;",
        "Прозрачный лес один чернеет,",
        "И ель сквозь иней зеленеет,",
        "И речка подо льдом блестит."
      ]
    },
    {
      title: "Я помню чудное мгновенье",
      year: "1825",
      text: [
        "Я помню чудное мгновенье:",
        "Передо мной явилась ты,",
        "Как мимолетное виденье,",
        "Как гений чистой красоты.",
        "",
        "В томленьях грусти безнадежной,",
        "В тревогах шумной суеты,",
        "Звучал мне долго голос нежный",
        "И снились милые черты.",
        "",
        "Шли годы. Бурь порыв мятежный",
        "Рассеял прежние мечты,",
        "И я забыл твой голос нежный,",
        "Твои небесные черты."
      ]
    },
    {
      title: "К Чаадаеву",
      year: "1818",
      text: [
        "Любви, надежды, тихой славы",
        "Недолго нежил нас обман,",
        "Исчезли юные забавы,",
        "Как сон, как утренний туман;",
        "Но в нас горит еще желанье,",
        "Под гнетом власти роковой",
        "Нетерпеливою душой",
        "Отчизны внемлем призыванье.",
        "",
        "Мы ждем с томленьем упованья",
        "Минуты вольности святой,",
        "Как ждет любовник молодой",
        "Минуты верного свиданья.",
        "Пока свободою горим,",
        "Пока сердца для чести живы,",
        "Мой друг, отчизне посвятим",
        "Души прекрасные порывы!"
      ]
    },
    {
      title: "Узник",
      year: "1822",
      text: [
        "Сижу за решеткой в темнице сырой.",
        "Вскормленный в неволе орел молодой,",
        "Мой грустный товарищ, махая крылом,",
        "Кровавую пищу клюет под окном,",
        "",
        "Клюет, и бросает, и смотрит в окно,",
        "Как будто со мною задумал одно.",
        "Зовет меня взглядом и криком своим",
        "И вымолвить хочет: «Давай улетим!",
        "",
        "Мы вольные птицы; пора, брат, пора!",
        "Туда, где за тучей белеет гора,",
        "Туда, где синеют морские края,",
        "Туда, где гуляем лишь ветер... да я!..»"
      ]
    },
    {
      title: "Песнь о вещем Олеге",
      year: "1822",
      text: [
        "Как ныне сбирается вещий Олег",
        "Отмстить неразумным хазарам,",
        "Их селы и нивы за буйный набег",
        "Обрек он мечам и пожарам;",
        "С дружиной своей, в цареградской броне,",
        "Князь по полю едет на верном коне.",
        "",
        "Из темного леса навстречу ему",
        "Идет вдохновенный кудесник,",
        "Покорный Перуну старик одному,",
        "Заветов грядущего вестник,",
        "В мольбах и гаданьях проведший свой век.",
        "И к мудрому старцу подъехал Олег."
      ]
    },
    {
      title: "Во глубине сибирских руд",
      year: "1827",
      text: [
        "Во глубине сибирских руд",
        "Храните гордое терпенье,",
        "Не пропадет ваш скорбный труд",
        "И дум высокое стремленье.",
        "",
        "Несчастью верная сестра,",
        "Надежда в мрачном подземелье",
        "Разбудит бодрость и веселье,",
        "Придет желанная пора:",
        "",
        "Любовь и дружество до вас",
        "Дойдут сквозь мрачные затворы,",
        "Как в ваши каторжные норы",
        "Доходит мой свободный глас."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <Link to="/works">
            <Button variant="ghost" className="gap-2">
              <Icon name="ArrowLeft" size={18} />
              К произведениям
            </Button>
          </Link>
        </div>

        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 font-serif">
            Стихотворения
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
            Избранная лирика Александра Сергеевича Пушкина
          </p>
        </header>

        <div className="space-y-4 sm:space-y-6">
          {poems.map((poem, index) => (
            <Card
              key={index}
              className="overflow-hidden border-2 border-amber-100 hover:border-amber-300 transition-all bg-white"
            >
              <button
                onClick={() => setSelectedPoem(selectedPoem === index ? null : index)}
                className="w-full p-5 sm:p-6 text-left hover:bg-amber-50/50 transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 font-serif">
                      {poem.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">{poem.year}</p>
                  </div>
                  <Icon
                    name={selectedPoem === index ? "ChevronUp" : "ChevronDown"}
                    size={24}
                    className="text-amber-600 flex-shrink-0"
                  />
                </div>
              </button>

              {selectedPoem === index && (
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2">
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-5 sm:p-8 border-l-4 border-amber-500">
                    <div className="font-serif text-sm sm:text-base lg:text-lg text-gray-800 leading-relaxed space-y-2">
                      {poem.text.map((line, lineIndex) => (
                        <p key={lineIndex} className={line === "" ? "h-4" : ""}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="mt-10 sm:mt-16 bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-amber-200 text-center">
          <Icon name="BookMarked" size={40} className="mx-auto text-amber-600 mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 font-serif">
            Поэтическое наследие
          </h2>
          <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Лирика Пушкина охватывает все стороны человеческой жизни: любовь и дружбу, 
            природу и философию, гражданские чувства и личные переживания. 
            Его стихи отличаются музыкальностью, точностью слова и глубиной мысли.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Poems;
