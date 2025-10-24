import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Biography = () => {
  const periods = [
    {
      year: "1799",
      title: "Рождение",
      description: "Александр Сергеевич Пушкин родился 26 мая (6 июня по новому стилю) 1799 года в Москве, в семье небогатого дворянина. Его прадедом по матери был африканец Абрам Ганнибал, воспитанник Петра I."
    },
    {
      year: "1811–1817",
      title: "Царскосельский лицей",
      description: "В 12 лет Пушкин поступил в Царскосельский лицей. Здесь он начал писать стихи и познакомился с будущими декабристами. В лицее он встретил своих лучших друзей: Пущина, Дельвига, Кюхельбекера."
    },
    {
      year: "1820",
      title: "Южная ссылка",
      description: "За вольнолюбивые стихи Пушкин был выслан на юг. Он побывал на Кавказе, в Крыму, жил в Кишинёве и Одессе. В этот период написаны романтические поэмы «Кавказский пленник», «Бахчисарайский фонтан»."
    },
    {
      year: "1824–1826",
      title: "Михайловское",
      description: "Ссылка в родовое имение Михайловское. Здесь Пушкин много работал: закончил «Евгения Онегина», написал «Бориса Годунова», драму «Борис Годунов» и множество лирических стихотворений."
    },
    {
      year: "1831",
      title: "Женитьба",
      description: "Пушкин женился на Наталье Гончаровой, первой красавице Москвы. У них родилось четверо детей. Семейная жизнь поэта была омрачена светскими сплетнями и долгами."
    },
    {
      year: "1830-е",
      title: "Болдинская осень",
      description: "Самый плодотворный период творчества. В Болдино за три месяца 1830 года Пушкин создал множество произведений: «Повести Белкина», «Маленькие трагедии», завершил «Онегина», написал около 30 стихотворений."
    },
    {
      year: "1837",
      title: "Дуэль и смерть",
      description: "27 января (8 февраля) Пушкин стрелялся на дуэли с Дантесом, защищая честь своей жены. Поэт был смертельно ранен и скончался 29 января (10 февраля) 1837 года в возрасте 37 лет."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <Icon name="ArrowLeft" size={18} />
              На главную
            </Button>
          </Link>
        </div>

        <header className="text-center mb-10 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 font-serif">
            Биография
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
            Жизненный путь величайшего русского поэта
          </p>
        </header>

        <div className="space-y-6 sm:space-y-8 mb-10 sm:mb-16">
          {periods.map((period, index) => (
            <div
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 border-l-4 border-amber-500 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-base sm:text-lg text-center px-2">
                      {period.year}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 font-serif">
                    {period.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {period.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-amber-300">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 font-serif text-center">
            Интересные факты
          </h2>
          <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-800">
            <li className="flex gap-3">
              <Icon name="Check" size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <span>Пушкин знал несколько иностранных языков: французский, английский, немецкий, итальянский, испанский, латинский и греческий</span>
            </li>
            <li className="flex gap-3">
              <Icon name="Check" size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <span>Поэт участвовал в более чем 20 дуэлях, последняя из которых стала роковой</span>
            </li>
            <li className="flex gap-3">
              <Icon name="Check" size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <span>У Пушкина была огромная личная библиотека — более 3500 книг на 14 языках</span>
            </li>
            <li className="flex gap-3">
              <Icon name="Check" size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <span>Поэт был страстным картёжником и часто проигрывал большие суммы</span>
            </li>
            <li className="flex gap-3">
              <Icon name="Check" size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <span>Пушкин создал более 800 лирических стихотворений, 12 поэм, 5 повестей и роман в стихах</span>
            </li>
          </ul>
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <Link to="/works">
            <Button size="lg" className="bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white">
              Перейти к произведениям
              <Icon name="ArrowRight" size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Biography;
