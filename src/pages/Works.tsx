import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Works = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Все");

  const works = [
    {
      title: "Евгений Онегин",
      year: "1823–1831",
      category: "Роман в стихах",
      description: "Энциклопедия русской жизни. История любви Татьяны Лариной и Евгения Онегина — главное произведение Пушкина.",
      quote: "Мой дядя самых честных правил, Когда не в шутку занемог..."
    },
    {
      title: "Капитанская дочка",
      year: "1836",
      category: "Проза",
      description: "Исторический роман о Пугачёвском восстании и любви Петра Гринёва и Маши Мироновой.",
      quote: "Береги честь смолodu"
    },
    {
      title: "Руслан и Людмила",
      year: "1820",
      category: "Поэма",
      description: "Первая законченная поэма Пушкина, написанная по мотивам русских сказок.",
      quote: "У лукоморья дуб зелёный; Златая цепь на дубе том..."
    },
    {
      title: "Борис Годунов",
      year: "1825",
      category: "Драма",
      description: "Историческая драма о царе Борисе Годунове и Смутном времени.",
      quote: "Ещё одно, последнее сказанье — И летопись окончена моя"
    },
    {
      title: "Медный всадник",
      year: "1833",
      category: "Поэма",
      description: "Поэма о наводнении 1824 года в Петербурге и маленьком человеке перед лицом истории.",
      quote: "На берегу пустынных волн Стоял он, дум великих полн..."
    },
    {
      title: "Повести Белкина",
      year: "1830",
      category: "Проза",
      description: "Цикл из пяти повестей: «Выстрел», «Метель», «Гробовщик», «Станционный смотритель», «Барышня-крестьянка».",
      quote: "Во всех ты, Душенька, нарядах хороша"
    },
    {
      title: "Я помню чудное мгновенье",
      year: "1825",
      category: "Лирика",
      description: "Одно из самых известных любовных стихотворений, посвящённое Анне Керн.",
      quote: "Я помню чудное мгновенье: Передо мной явилась ты..."
    },
    {
      title: "Зимнее утро",
      year: "1829",
      category: "Лирика",
      description: "Светлое, радостное стихотворение о красоте русской зимы.",
      quote: "Мороз и солнце; день чудесный!"
    },
    {
      title: "К Чаадаеву",
      year: "1818",
      category: "Лирика",
      description: "Вольнолюбивое стихотворение, призыв к служению Отчизне.",
      quote: "Пока свободою горим, Пока сердца для чести живы..."
    },
    {
      title: "Пиковая дама",
      year: "1834",
      category: "Проза",
      description: "Мистическая повесть о немецком инженере Германне и его роковой игре.",
      quote: "Тройка, семёрка, туз"
    },
    {
      title: "Маленькие трагедии",
      year: "1830",
      category: "Драма",
      description: "Цикл из четырёх пьес: «Скупой рыцарь», «Моцарт и Сальери», «Каменный гость», «Пир во время чумы».",
      quote: "Гений и злодейство — Две вещи несовместные"
    },
    {
      title: "Сказка о царе Салтане",
      year: "1831",
      category: "Сказка",
      description: "Волшебная сказка о царевиче Гвидоне и прекрасной Царевне Лебеди.",
      quote: "Ветер по морю гуляет И кораблик подгоняет..."
    }
  ];

  const categories = ["Все", "Лирика", "Поэма", "Проза", "Драма", "Роман в стихах", "Сказка"];

  const filteredWorks = selectedCategory === "Все" 
    ? works 
    : works.filter(work => work.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <Icon name="ArrowLeft" size={18} />
              На главную
            </Button>
          </Link>
        </div>

        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 font-serif">
            Произведения
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto mb-6 sm:mb-8">
            Избранные творения великого поэта
          </p>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                size="sm"
                className={`text-xs sm:text-sm ${
                  selectedCategory === category 
                    ? "bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800" 
                    : ""
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredWorks.map((work, index) => (
            <Card
              key={index}
              className="p-5 sm:p-6 hover:shadow-xl transition-all duration-300 border-2 border-amber-100 hover:border-amber-300 bg-white"
            >
              <div className="mb-3 sm:mb-4">
                <span className="inline-block px-2.5 sm:px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs sm:text-sm rounded-full font-medium">
                  {work.category}
                </span>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 font-serif">
                {work.title}
              </h3>
              
              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                {work.year}
              </p>
              
              <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 leading-relaxed">
                {work.description}
              </p>
              
              <blockquote className="border-l-3 border-l-4 border-amber-400 pl-3 sm:pl-4 py-2">
                <p className="text-xs sm:text-sm italic text-gray-600 font-serif">
                  "{work.quote}"
                </p>
              </blockquote>
            </Card>
          ))}
        </div>

        {filteredWorks.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <Icon name="BookOpen" size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-lg sm:text-xl text-gray-600">
              В этой категории пока нет произведений
            </p>
          </div>
        )}

        <div className="mt-10 sm:mt-16 bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-amber-200 text-center">
          <Icon name="Sparkles" size={40} className="mx-auto text-amber-600 mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 font-serif">
            Наследие Пушкина
          </h2>
          <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto leading-relaxed mb-6">
            Александр Сергеевич Пушкин создал более 800 лирических стихотворений, 
            12 поэм, драматические произведения, повести и роман в стихах. 
            Его творчество стало основой русской классической литературы и 
            продолжает вдохновлять читателей по всему миру.
          </p>
          <Link to="/poems">
            <Button size="lg" className="bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white">
              <Icon name="BookText" size={18} className="mr-2" />
              Читать стихотворения
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Works;