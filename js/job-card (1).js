document.addEventListener('DOMContentLoaded', () => {
    const jobsData = [
        {
            title: 'Frontend Developer',
            company: 'Tech Solutions Inc.',
            location: 'New York, NY',
            type: 'Full-time',
            salary: '$120k - $150k',
            postedDate: 'hace 2 días'
        },
        {
            title: 'UX/UI Designer',
            company: 'Creative Minds LLC',
            location: 'Remoto',
            type: 'Contrato',
            salary: '$85/hr',
            postedDate: 'hace 5 días'
        },
        {
            title: 'Backend Engineer',
            company: 'DataCore',
            location: 'San Francisco, CA',
            type: 'Full-time',
            salary: null, // Salario no especificado
            postedDate: 'hace 1 semana'
        },
        {
            title: 'Product Manager',
            company: 'Innovate Co.',
            location: 'Austin, TX',
            type: 'Full-time',
            salary: '$140k',
            postedDate: 'hace 3 horas'
        }
    ];

    const listingsContainer = document.getElementById('job-listings');
    const template = document.getElementById('job-card-template');

    if (!listingsContainer || !template) {
        console.error("No se encontraron los elementos necesarios en el DOM.");
        return;
    }

    /**
     * Crea y añade una tarjeta de trabajo al DOM.
     * @param {object} job - El objeto con los datos del trabajo.
     */
    function createJobCard(job) {
        const cardClone = template.content.cloneNode(true);

        // Rellenar datos básicos
        cardClone.querySelector('.job-card__title').textContent = job.title;
        cardClone.querySelector('.job-card__company').textContent = job.company;
        cardClone.querySelector('.job-card__date-text').textContent = job.postedDate;

        const tagsContainer = cardClone.querySelector('.job-card__tags');

        // Crear y añadir etiquetas
        const createTag = (iconClass, text) => {
            const tag = document.createElement('span');
            tag.className = 'job-card__tag';
            tag.innerHTML = `<i class="fa-solid ${iconClass}"></i> ${text}`;
            return tag;
        };

        tagsContainer.appendChild(createTag('fa-location-dot', job.location));
        tagsContainer.appendChild(createTag('fa-briefcase', job.type));

        // Añadir etiqueta de salario solo si existe
        if (job.salary) {
            tagsContainer.appendChild(createTag('fa-dollar-sign', job.salary));
        }

        // Añadir event listeners a los botones
        cardClone.querySelector('.job-card__bookmark-btn').addEventListener('click', () => {
            alert(`Has guardado el trabajo: ${job.title}`);
        });

        cardClone.querySelector('.job-card__apply-btn').addEventListener('click', () => {
            alert(`Aplicando a: ${job.title} en ${job.company}`);
        });

        listingsContainer.appendChild(cardClone);
    }

    // Generar una tarjeta para cada trabajo en los datos
    jobsData.forEach(job => {
        createJobCard(job);
    });
});