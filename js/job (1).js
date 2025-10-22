document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');

  const featuredJobs = [
    {
      id: '1',
      title: 'Desarrollador Frontend Senior',
      company: 'Tech Innovators Inc',
      logo: '',
      location: 'San Francisco, CA',
      type: 'Tiempo completo',
      postedDate: 'Hace 2 días',
      salary: '$120,000 - $150,000',
      featured: true
    },
    {
      id: '2',
      title: 'Gerente de Producto',
      company: 'Global Solutions',
      logo: '',
      location: 'New York, NY',
      type: 'Tiempo completo',
      postedDate: 'Hace 1 semana',
      salary: '$110,000 - $135,000',
      featured: true
    },
    {
      id: '3',
      title: 'Diseñador UX/UI',
      company: 'Creative Studio',
      logo: '',
      location: 'Remoto',
      type: 'Contrato',
      postedDate: 'Hace 3 días',
      salary: '$85,000 - $110,000',
      featured: true
    }
  ];

  const recentJobs = [
    {
      id: '4',
      title: 'Ingeniero de Backend',
      company: 'Data Masters',
      logo: '',
      location: 'Austin, TX',
      type: 'Tiempo completo',
      postedDate: 'Hace 5 días',
      salary: '$100,000 - $130,000'
    },
    {
      id: '5',
      title: 'Especialista en Marketing',
      company: 'Growth Hackers',
      logo:'',
      location: 'Chicago, IL',
      type: 'Medio tiempo',
      postedDate: 'Hace 2 días',
      salary: '$50,000 - $70,000'
    },
    {
      id: '6',
      title: 'Analista de Datos',
      company: 'Analytics Corp',
      logo: '',
      location: 'Remoto',
      type: 'Tiempo completo',
      postedDate: 'Hace 1 día',
      salary: '$75,000 - $95,000'
    },
    {
      id: '7',
      title: 'Ingeniero DevOps',
      company: 'Cloud Systems',
      logo: '',
      location: 'Seattle, WA',
      type: 'Tiempo completo',
      postedDate: 'Hace 4 días',
      salary: '$115,000 - $145,000'
    }
  ];

  const companies = [
    {
      id: 'c1',
      name: 'Tech Innovators Inc',
      logo: '',
      industry: 'Tecnología',
      employees: '1,001-5,000',
      rating: 4.2,
      jobsCount: 18
    },
    {
      id: 'c2',
      name: 'Global Solutions',
      logo: '',
      industry: 'Consultoría',
      employees: '5,001-10,000',
      rating: 4.5,
      jobsCount: 24
    },
    {
      id: 'c3',
      name: 'Creative Studio',
      logo: '',
      industry: 'Diseño',
      employees: '501-1,000',
      rating: 4.7,
      jobsCount: 12
    },
    {
      id: 'c4',
      name: 'Data Masters',
      logo: '',
      industry: 'Datos y Análisis',
      employees: '100-500',
      rating: 4.0,
      jobsCount: 9
    }
  ];

  const currentUser = {
    id: 'u123',
    name: 'Alex Johnson',
    role: 'seeker',
    email: 'alex.johnson@example.com',
    avatar: '',
    title: 'Desarrollador Frontend',
    location: 'San Francisco, CA',
    joinDate: 'Enero 2023',
    applications: 12,
    savedJobs: 8
  };

  const employerProfile = {
    id: 'e456',
    name: 'Sarah Williams',
    role: 'employer',
    email: 'sarah@techinnovators.com',
    avatar: '',
    company: 'Tech Innovators Inc',
    location: 'San Francisco, CA',
    joinDate: 'Marzo 2022',
    postedJobs: 15,
    messages: 32,
    notifications: 8
  };

  let isMenuOpen = false;
  let isSearchFocused = false;
  let activeSection = 'home';
  let isDownloading = false;
  let downloadSuccess = false;

  const render = () => {
    root.innerHTML = `
      <div class="min-h-screen bg-gray-50 flex flex-col">
        ${header()}
        <main class="flex-grow">
          ${renderContent()}
        </main>
        ${footer()}
      </div>
    `;
    addEventListeners();
    lucide.createIcons();
  };

  const header = () => {
    return `
      <header class="sticky top-0 z-50 bg-white shadow-sm transition-all duration-300">
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-between h-16 md:h-20">
            <div class="flex items-center">
              <div id="logo" class="text-blue-600 font-bold text-xl md:text-2xl flex items-center cursor-pointer">
                <i data-lucide="briefcase" class="mr-2"></i>
                <span>Búsqueda de Empleo</span>
              </div>
            </div>
            <nav class="hidden md:flex items-center space-x-8">
              <button data-section="home" class="nav-btn flex items-center transition-colors ${activeSection === 'home' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}">
                <i data-lucide="briefcase" class="mr-1" size="20"></i>
                <span>Inicio</span>
              </button>
              <button data-section="jobListings" class="nav-btn flex items-center transition-colors ${activeSection === 'jobListings' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}">
                <i data-lucide="file-text" class="mr-1" size="20"></i>
                <span>Ofertas de Empleo</span>
              </button>
              <button data-section="jobSeekerProfile" class="nav-btn flex items-center transition-colors ${activeSection === 'jobSeekerProfile' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}">
                <i data-lucide="user" class="mr-1" size="20"></i>
                <span>Perfil de Candidato</span>
              </button>
              <button data-section="employerProfile" class="nav-btn flex items-center transition-colors ${activeSection === 'employerProfile' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}">
                <i data-lucide="building" class="mr-1" size="20"></i>
                <span>Perfil de Empleador</span>
              </button>
              <button data-section="download" class="nav-btn flex items-center transition-colors ${activeSection === 'download' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}">
                <i data-lucide="download" class="mr-1" size="20"></i>
                <span>Descargar</span>
              </button>
            </nav>
            <div class="flex items-center space-x-4">
              <button class="text-gray-600 hover:text-blue-600 transition-colors relative">
                <i data-lucide="bell" size="20"></i>
                <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>
              <button class="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-colors">
                Iniciar Sesión
              </button>
              <button id="mobile-menu-btn" class="md:hidden text-gray-700">
                ${isMenuOpen ? '<i data-lucide="x" size="24"></i>' : '<i data-lucide="menu" size="24"></i>'}
              </button>
            </div>
          </div>
        </div>
        <div id="mobile-menu" class="${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t">
          <div class="container mx-auto px-4 py-3 space-y-1">
            <button data-section="home" class="mobile-nav-btn flex items-center py-3 px-4 rounded-lg transition-colors w-full justify-start ${activeSection === 'home' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}">
              <i data-lucide="briefcase" class="mr-3" size="20"></i>
              <span>Inicio</span>
            </button>
            <button data-section="jobListings" class="mobile-nav-btn flex items-center py-3 px-4 rounded-lg transition-colors w-full justify-start ${activeSection === 'jobListings' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}">
              <i data-lucide="file-text" class="mr-3" size="20"></i>
              <span>Ofertas de Empleo</span>
            </button>
            <button data-section="jobSeekerProfile" class="mobile-nav-btn flex items-center py-3 px-4 rounded-lg transition-colors w-full justify-start ${activeSection === 'jobSeekerProfile' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}">
              <i data-lucide="user" class="mr-3" size="20"></i>
              <span>Perfil de Candidato</span>
            </button>
            <button data-section="employerProfile" class="mobile-nav-btn flex items-center py-3 px-4 rounded-lg transition-colors w-full justify-start ${activeSection === 'employerProfile' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}">
              <i data-lucide="building" class="mr-3" size="20"></i>
              <span>Perfil de Empleador</span>
            </button>
            <button data-section="download" class="mobile-nav-btn flex items-center py-3 px-4 rounded-lg transition-colors w-full justify-start ${activeSection === 'download' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}">
              <i data-lucide="download" class="mr-3" size="20"></i>
              <span>Descargar Código Fuente</span>
            </button>
            <div class="pt-2 pb-3">
              <button class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Iniciar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>
    `;
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return homeContent();
      case 'jobSeekerProfile':
        return userProfileContent(currentUser, false);
      case 'employerProfile':
        return userProfileContent(employerProfile, true);
      case 'jobListings':
        return jobListingsContent();
      case 'download':
        return downloadContent();
      default:
        return '';
    }
  };

  const homeContent = () => {
    return `
      <section class="bg-gradient-to-r from-blue-600 to-blue-800 py-10 md:py-16 transition-all duration-500">
        <div class="container mx-auto px-4">
          <div class="max-w-3xl mx-auto text-center mb-8">
            <h1 class="text-[clamp(1.75rem,4vw,2.75rem)] font-bold text-white leading-tight mb-4">
              Encuentra el Trabajo de tus Sueños Hoy
            </h1>
            <p class="text-blue-100 text-lg md:text-xl mb-8">
              Busca miles de oportunidades de trabajo con tus criterios ideales
            </p>
            <form id="search-form" class="bg-white rounded-xl shadow-lg p-3 md:p-4 transform transition-all duration-300 hover:shadow-xl">
              <div class="flex flex-col md:flex-row gap-3">
                <div class="flex-grow relative">
                  <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <i data-lucide="search" size="18"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Título del trabajo, palabras clave o empresa"
                    class="search-input w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                  />
                </div>
                <div class="flex-grow relative">
                  <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <i data-lucide="map-pin" size="18"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Ciudad, estado o remoto"
                    class="search-input w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                  />
                </div>
                <button
                  type="submit"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center"
                >
                  <i data-lucide="search" size="18" class="mr-2"></i>
                  <span class="hidden sm:inline">Buscar Empleos</span>
                </button>
              </div>
              <div id="search-filters" class="hidden mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                  <button class="flex items-center text-sm text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors">
                      <i data-lucide="brush" size="14" class="mr-1.5"></i>
                      <span>Todos los Filtros</span>
                  </button>
                  <button class="text-sm text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors">
                      Tiempo completo
                  </button>
                  <button class="text-sm text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors">
                      Medio tiempo
                  </button>
                  <button class="text-sm text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors">
                      Remoto
                  </button>
                  <button class="text-sm text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors">
                      Nivel de entrada
                  </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section class="py-12 md:py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900">Empleos Destacados</h2>
            <a href="#" class="text-blue-600 hover:text-blue-800 font-medium flex items-center transition-colors">
              Ver Todos <i data-lucide="arrow-right" size="16" class="ml-1"></i>
            </a>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${featuredJobs.map(job => jobCard(job)).join('')}
          </div>
        </div>
      </section>
      <section class="py-12 md:py-16 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center mb-8">
                <h2 class="text-2xl md:text-3xl font-bold text-gray-900">Listados de Empleos Recientes</h2>
                <div class="flex space-x-2">
                    <button class="px-3 py-1 border border-gray-300 rounded-l-lg bg-white hover:bg-gray-50 transition-colors">
                        <i data-lucide="chevron-down" size="18" class="rotate-90"></i>
                    </button>
                    <button class="px-3 py-1 border border-gray-300 rounded-r-lg bg-white hover:bg-gray-50 transition-colors">
                        <i data-lucide="chevron-down" size="18" class="-rotate-90"></i>
                    </button>
                </div>
            </div>
            <div class="space-y-4">
                ${recentJobs.map(job => recentJob(job)).join('')}
            </div>
            <div class="mt-10 text-center">
                <button class="inline-flex items-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
                    Ver Todos los Empleos <i data-lucide="arrow-right" size="16" class="ml-2"></i>
                </button>
            </div>
        </div>
      </section>
      <section class="py-12 md:py-16 bg-white">
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center mb-8">
                <h2 class="text-2xl md:text-3xl font-bold text-gray-900">Principales Empresas Contratando</h2>
                <a href="#" class="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                    Explorar Todas las Empresas
                </a>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                ${companies.map(company => companyCard(company)).join('')}
            </div>
        </div>
      </section>
      <section class="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div class="container mx-auto px-4">
            <div class="max-w-3xl mx-auto text-center">
                <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                    ¿Listo para Encontrar el Trabajo de tus Sueños?
                </h2>
                <p class="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                    Crea tu perfil hoy y obtén recomendaciones de trabajo personalizadas y adaptadas a tus habilidades y experiencia.
                </p>
                <div class="flex flex-col sm:flex-row justify-center gap-4">
                    <button class="bg-white text-blue-700 hover:bg-blue-50 font-bold px-6 py-3 rounded-lg transition-colors">
                        Crear Cuenta Gratis
                    </button>
                    <button class="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold px-6 py-3 rounded-lg transition-colors">
                        Buscar Empleos
                    </button>
                </div>
            </div>
        </div>
      </section>
    `;
  };

  const jobCard = (job) => {
      return `
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
            <div class="p-5 flex-grow">
                <div class="flex items-start mb-4">
                    <div class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                        <i data-lucide="building" class="text-blue-600" size="24"></i>
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">${job.title}</h3>
                        <p class="text-gray-600">${job.company}</p>
                    </div>
                </div>
                <div class="flex flex-wrap gap-2 mb-4">
                    <span class="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-sm">${job.type}</span>
                    <span class="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-sm">${job.location}</span>
                </div>
                <p class="text-gray-800 font-semibold">${job.salary}</p>
            </div>
            <div class="p-5 border-t border-gray-100 flex justify-between items-center">
                <span class="text-sm text-gray-500">${job.postedDate}</span>
                <button class="text-blue-600 hover:text-blue-800 font-medium">
                    Aplicar Ahora
                </button>
            </div>
        </div>
      `;
  }

  const recentJob = (job) => {
      return `
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
            <div class="p-4 md:p-5">
                <div class="flex flex-col md:flex-row md:items-center">
                    <div class="flex items-center mb-4 md:mb-0 md:mr-6">
                        <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                            <i data-lucide="building" size="24" class="text-blue-600"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                                ${job.title}
                            </h3>
                            <p class="text-gray-600">${job.company}</p>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-3 md:gap-4 mb-4 md:mb-0 md:mr-auto">
                        <span class="inline-flex items-center text-sm text-gray-600">
                            <i data-lucide="map-pin" size="14" class="mr-1.5"></i>
                            ${job.location}
                        </span>
                        <span class="inline-flex items-center text-sm text-gray-600">
                            ${job.type}
                        </span>
                        ${job.salary ? `
                        <span class="inline-flex items-center text-sm text-gray-600">
                            <i data-lucide="dollar-sign" size="14" class="mr-1.5"></i>
                            ${job.salary}
                        </span>
                        ` : ''}
                    </div>
                    <div class="flex items-center justify-between md:justify-end md:space-x-4">
                        <span class="text-sm text-gray-500 flex items-center mb-3 md:mb-0">
                            <i data-lucide="clock" size="14" class="mr-1.5"></i>
                            ${job.postedDate}
                        </span>
                        <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                            Aplicar Ahora
                        </button>
                    </div>
                </div>
            </div>
        </div>
      `;
  }

  const companyCard = (company) => {
      return `
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
            <div class="p-5">
                <div class="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center mb-4 mx-auto">
                    <i data-lucide="building" size="32" class="text-blue-600"></i>
                </div>
                <h3 class="text-lg font-semibold text-center text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    ${company.name}
                </h3>
                <p class="text-sm text-gray-600 text-center mb-3">${company.industry}</p>
                <div class="flex items-center justify-center mb-4">
                    <div class="flex items-center text-yellow-400 mr-2">
                        <i data-lucide="star" size="16" fill="currentColor"></i>
                        <span class="ml-1 text-gray-900 font-medium">${company.rating}</span>
                    </div>
                    <span class="text-sm text-gray-500">(${company.employees} empleados)</span>
                </div>
                <div class="pt-4 border-t border-gray-100 text-center">
                    <a href="#" class="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors">
                        ${company.jobsCount} Posiciones Abiertas
                    </a>
                </div>
            </div>
        </div>
      `;
  }

  const userProfileContent = (profile, isEmployer) => {
    return `
      <section class="py-12 md:py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900">Perfil de ${isEmployer ? 'Empleador' : 'Candidato'}</h2>
            <button data-section="home" class="back-to-home text-blue-600 hover:text-blue-800 font-medium flex items-center transition-colors">
              Volver al Inicio <i data-lucide="arrow-right" size="16" class="ml-1 transform rotate-180"></i>
            </button>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div class="bg-gradient-to-r from-blue-600 to-blue-800 h-32 relative">
                  <div class="absolute bottom-0 left-6 transform translate-y-1/2">
                      <div class="w-24 h-24 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center">
                          <i data-lucide="user" size="40" class="text-blue-600"></i>
                      </div>
                  </div>
                  <button class="absolute right-6 top-6 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors">
                      <i data-lucide="settings" size="18"></i>
                  </button>
              </div>
              <div class="pt-16 pb-6 px-6">
                  <div class="flex justify-between items-start mb-6">
                      <div>
                          <h2 class="text-2xl font-bold text-gray-900">${profile.name}</h2>
                          <p class="text-gray-600">${isEmployer ? profile.company : profile.title} • ${profile.location}</p>
                      </div>
                      <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                          ${isEmployer ? 'Publicar un Empleo' : 'Editar Perfil'}
                      </button>
                  </div>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      ${isEmployer ? `
                          <div class="bg-gray-50 p-4 rounded-lg text-center">
                              <p class="text-2xl font-bold text-gray-900">${profile.postedJobs}</p>
                              <p class="text-sm text-gray-600">Empleos Publicados</p>
                          </div>
                          <div class="bg-gray-50 p-4 rounded-lg text-center">
                              <p class="text-2xl font-bold text-gray-900">${profile.messages}</p>
                              <p class="text-sm text-gray-600">Mensajes</p>
                          </div>
                          <div class="bg-gray-50 p-4 rounded-lg text-center">
                              <p class="text-2xl font-bold text-gray-900">142</p>
                              <p class="text-sm text-gray-600">Candidatos</p>
                          </div>
                          <div class="bg-gray-50 p-4 rounded-lg text-center">
                              <p class="text-2xl font-bold text-gray-900">8</p>
                              <p class="text-sm text-gray-600">Contrataciones este Mes</p>
                          </div>
                      ` : `
                          <div class="bg-gray-50 p-4 rounded-lg text-center">
                              <p class="text-2xl font-bold text-gray-900">${profile.applications}</p>
                              <p class="text-sm text-gray-600">Aplicaciones</p>
                          </div>
                          <div class="bg-gray-50 p-4 rounded-lg text-center">
                              <p class="text-2xl font-bold text-gray-900">${profile.savedJobs}</p>
                              <p class="text-sm text-gray-600">Empleos Guardados</p>
                          </div>
                          <div class="bg-gray-50 p-4 rounded-lg text-center">
                              <p class="text-2xl font-bold text-gray-900">5</p>
                              <p class="text-sm text-gray-600">Entrevistas</p>
                          </div>
                          <div class="bg-gray-50 p-4 rounded-lg text-center">
                              <p class="text-2xl font-bold text-gray-900">2</p>
                              <p class="text-sm text-gray-600">Ofertas de Empleo</p>
                          </div>
                      `}
                  </div>
                  <div class="border-t border-gray-200 pt-6">
                      <h3 class="text-lg font-semibold text-gray-900 mb-4">
                          ${isEmployer ? 'Aplicaciones Recientes' : 'Actividad Reciente'}
                      </h3>
                      <div class="space-y-4">
                          ${isEmployer ? `
                              <div class="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                  <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3 flex-shrink-0">
                                      <i data-lucide="user" size="20" class="text-gray-600"></i>
                                  </div>
                                  <div class="flex-grow">
                                      <div class="flex justify-between">
                                          <h4 class="font-medium text-gray-900">Michael Chen</h4>
                                          <span class="text-sm text-gray-500">Hace 2h</span>
                                      </div>
                                      <p class="text-sm text-gray-600">Aplicó para Desarrollador Frontend Senior</p>
                                      <div class="flex space-x-2 mt-2">
                                          <button class="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
                                              Ver
                                          </button>
                                          <button class="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
                                              Mensaje
                                          </button>
                                      </div>
                                  </div>
                              </div>
                              <div class="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                  <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3 flex-shrink-0">
                                      <i data-lucide="user" size="20" class="text-gray-600"></i>
                                  </div>
                                  <div class="flex-grow">
                                      <div class="flex justify-between">
                                          <h4 class="font-medium text-gray-900">Sarah Johnson</h4>
                                          <span class="text-sm text-gray-500">Ayer</span>
                                      </div>
                                      <p class="text-sm text-gray-600">Aplicó para Gerente de Producto</p>
                                      <div class="flex space-x-2 mt-2">
                                          <button class="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
                                              Ver
                                          </button>
                                          <button class="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
                                              Mensaje
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          ` : `
                              <div class="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                  <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3 flex-shrink-0">
                                      <i data-lucide="chevrons-up" size="20" class="text-green-600"></i>
                                  </div>
                                  <div class="flex-grow">
                                      <div class="flex justify-between">
                                          <h4 class="font-medium text-gray-900">Aplicación Enviada</h4>
                                          <span class="text-sm text-gray-500">Hace 2d</span>
                                      </div>
                                      <p class="text-sm text-gray-600">Desarrollador Frontend Senior en Tech Innovators Inc</p>
                                  </div>
                              </div>
                              <div class="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                  <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3 flex-shrink-0">
                                      <i data-lucide="bookmark" size="20" class="text-blue-600"></i>
                                  </div>
                                  <div class="flex-grow">
                                      <div class="flex justify-between">
                                          <h4 class="font-medium text-gray-900">Empleo Guardado</h4>
                                          <span class="text-sm text-gray-500">Hace 5d</span>
                                      </div>
                                      <p class="text-sm text-gray-600">Diseñador UX/UI en Creative Studio</p>
                                  </div>
                              </div>
                          `}
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </section>
    `;
  };

  const jobListingsContent = () => {
    return `
      <section class="py-12 md:py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900">Tarjetas de Ofertas de Empleo</h2>
            <button data-section="home" class="back-to-home text-blue-600 hover:text-blue-800 font-medium flex items-center transition-colors">
              Volver al Inicio <i data-lucide="arrow-right" size="16" class="ml-1 transform rotate-180"></i>
            </button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${[...featuredJobs, ...recentJobs].map(job => jobCard(job)).join('')}
          </div>
        </div>
      </section>
    `;
  };

  const downloadContent = () => {
    return `
      <section class="py-16 md:py-24 bg-gray-50 flex-grow flex flex-col">
        <div class="container mx-auto px-4">
            <div class="max-w-3xl mx-auto text-center mb-12">
                <h2 class="text-2xl md:text-4xl font-bold text-gray-900 mb-4">Descargar Código Fuente Completo</h2>
                <p class="text-lg text-gray-600 mb-8">
                    Obtenga todos los archivos HTML, CSS y JavaScript para el proyecto de la plataforma de búsqueda de empleo en un solo paquete.
                </p>
                <div class="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-200">
                    <div class="flex flex-col md:flex-row items-center justify-between mb-8">
                        <div class="flex items-center mb-6 md:mb-0">
                            <div class="bg-blue-100 p-4 rounded-full mr-4">
                                <i data-lucide="code" size="32" class="text-blue-600"></i>
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-gray-900">Código Fuente de la Plataforma de Búsqueda de Empleo</h3>
                                <p class="text-gray-600">Archivos completos del proyecto</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-3xl font-bold text-gray-900">1.2 MB</p>
                            <p class="text-sm text-gray-500">Última actualización: ${new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div class="border-t border-gray-200 pt-6">
                        <h4 class="text-lg font-semibold text-gray-900 mb-4">Archivos Incluidos:</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div class="flex items-start">
                                <div class="bg-blue-50 p-2 rounded mr-3 mt-0.5">
                                    <i data-lucide="file-text" size="18" class="text-blue-600"></i>
                                </div>
                                <div>
                                    <p class="font-medium text-gray-900">Página de Inicio con Búsqueda</p>
                                    <p class="text-sm text-gray-600">Componentes HTML, CSS, JavaScript</p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <div class="bg-blue-50 p-2 rounded mr-3 mt-0.5">
                                    <i data-lucide="user" size="18" class="text-blue-600"></i>
                                </div>
                                <div>
                                    <p class="font-medium text-gray-900">Interfaces de Perfil de Usuario</p>
                                    <p class="text-sm text-gray-600">Perfiles de buscador de empleo y empleador</p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <div class="bg-blue-50 p-2 rounded mr-3 mt-0.5">
                                    <i data-lucide="briefcase" size="18" class="text-blue-600"></i>
                                </div>
                                <div>
                                    <p class="font-medium text-gray-900">Componentes de Listado de Empleos</p>
                                    <p class="text-sm text-gray-600">Diseños de tarjetas y maquetación</p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <div class="bg-blue-50 p-2 rounded mr-3 mt-0.5">
                                    <i data-lucide="brush" size="18" class="text-blue-600"></i>
                                </div>
                                <div>
                                    <p class="font-medium text-gray-900">Estilos y Scripts</p>
                                    <p class="text-sm text-gray-600">Estilos CSS y funcionalidad JavaScript</p>
                                </div>
                            </div>
                        </div>
                        <button id="download-btn" class="w-full flex items-center justify-center py-3 px-6 rounded-lg font-bold transition-colors ${isDownloading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}">
                            ${isDownloading ? `
                                <div class="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                                Descargando...
                            ` : downloadSuccess ? `
                                <i data-lucide="chevrons-up" size="20" class="mr-2"></i>
                                ¡Descarga Completa!
                            ` : `
                                <i data-lucide="download" size="20" class="mr-2"></i>
                                Descargar Código Fuente
                            `}
                        </button>
                    </div>
                </div>
                <div class="bg-blue-50 border border-blue-100 rounded-xl p-6">
                    <div class="flex items-start">
                        <i data-lucide="info" size="20" class="text-blue-600 mr-3 mt-0.5 flex-shrink-0"></i>
                        <p class="text-gray-700">
                            El paquete descargado incluye todos los componentes necesarios para ejecutar la plataforma de búsqueda de empleo localmente. 
                            Consulte el archivo README incluido para obtener instrucciones de configuración.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>
    `;
  };

  const footer = () => {
    if (activeSection === 'download') return '';
    return `
      <footer class="bg-gray-900 text-gray-400 py-12 md:py-16">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <div>
                    <div class="text-white font-bold text-xl flex items-center mb-4">
                        <i data-lucide="briefcase" class="mr-2"></i>
                        <span>Búsqueda de Empleo</span>
                    </div>
                    <p class="mb-4">
                        Conectando a profesionales talentosos con las carreras de sus sueños desde 2023.
                    </p>
                    <div class="flex space-x-4">
                    </div>
                </div>
                <div>
                    <h3 class="text-white font-semibold text-lg mb-4">Para Buscadores de Empleo</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="hover:text-white transition-colors">Buscar Empleos</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Recursos de Carrera</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Constructor de CV</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Consejos de Carrera</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-white font-semibold text-lg mb-4">Para Empleadores</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="hover:text-white transition-colors">Publicar un Empleo</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Buscar Candidatos</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Soluciones de Reclutamiento</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Precios</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-white font-semibold text-lg mb-4">Empresa</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="hover:text-white transition-colors">Sobre Nosotros</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Contacto</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Política de Privacidad</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Términos de Servicio</a></li>
                    </ul>
                </div>
            </div>
            <div class="pt-8 border-t border-blue-900 text-center text-sm">
                <p>&copy; ${new Date().getFullYear()} Búsqueda de Empleo. Todos los derechos reservados.</p>
            </div>
        </div>
      </footer>
    `;
  };

  const addEventListeners = () => {
    document.getElementById('logo').addEventListener('click', () => handleSectionChange('home'));
    document.getElementById('mobile-menu-btn').addEventListener('click', toggleMobileMenu);

    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => handleSectionChange(e.currentTarget.dataset.section));
    });

    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => handleSectionChange(e.currentTarget.dataset.section));
    });

    document.querySelectorAll('.back-to-home').forEach(btn => {
        btn.addEventListener('click', (e) => handleSectionChange(e.currentTarget.dataset.section));
    });

    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }

    const searchInputs = document.querySelectorAll('.search-input');
    if(searchInputs) {
        searchInputs.forEach(input => {
            input.addEventListener('focus', () => {
                isSearchFocused = true;
                document.getElementById('search-filters').style.display = 'flex';
            });
            input.addEventListener('blur', () => {
                isSearchFocused = false;
                // Don't hide if the other input has focus
                if(!document.querySelector('.search-input:focus')) {
                    document.getElementById('search-filters').style.display = 'none';
                }
            });
        });
    }


    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', handleDownload);
    }
  };

  const handleSectionChange = (section) => {
    activeSection = section;
    isMenuOpen = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    render();
  };

  const toggleMobileMenu = () => {
    isMenuOpen = !isMenuOpen;
    render();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Buscando...');
  };

  const handleDownload = () => {
    isDownloading = true;
    render();

    setTimeout(() => {
      isDownloading = false;
      downloadSuccess = true;
      render();

      setTimeout(() => {
        downloadSuccess = false;
        render();
      }, 5000);
    }, 2000);
  };

  render();
});