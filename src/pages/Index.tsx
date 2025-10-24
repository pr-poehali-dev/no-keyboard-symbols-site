import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <header className="text-center mb-12 sm:mb-16">
          <div className="mb-6 sm:mb-8">
            <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full bg-gradient-to-br from-amber-600 to-orange-700 shadow-2xl flex items-center justify-center text-white text-5xl sm:text-6xl font-serif">
              А.П
            </div>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 font-serif">
            Александр Сергеевич Пушкин
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Солнце русской поэзии. Великий поэт, прозаик и драматург, основоположник современного русского литературного языка
          </p>
          <div className="mt-6 sm:mt-8 text-base sm:text-lg text-gray-600 font-serif italic">
            1799 — 1837
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <Link to="/biography" className="group">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 border-2 border-amber-100 hover:border-amber-300 h-full">
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Icon name="User" size={24} className="text-white sm:w-8 sm:h-8" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 font-serif">
                    Биография
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Узнайте о жизненном пути великого поэта: от детства в Москве до трагической дуэли в Петербурге
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/works" className="group">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 border-2 border-amber-100 hover:border-amber-300 h-full">
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Icon name="BookOpen" size={24} className="text-white sm:w-8 sm:h-8" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 font-serif">
                    Произведения
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Познакомьтесь с творчеством поэта: стихи, поэмы, романы и драматические произведения
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border-2 border-amber-200">
          <blockquote className="text-center">
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-800 font-serif italic leading-relaxed mb-4 sm:mb-6">
              "Мороз и солнце; день чудесный!<br />
              Еще ты дремлешь, друг прелестный —<br />
              Пора, красавица, проснись..."
            </p>
            <footer className="text-base sm:text-lg text-gray-600">
              — «Зимнее утро», 1829
            </footer>
          </blockquote>
        </div>

        <footer className="mt-12 sm:mt-16 text-center text-sm sm:text-base text-gray-500 border-t border-gray-200 pt-6 sm:pt-8">
          <p>Посвящается памяти великого русского поэта</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
