document.addEventListener("DOMContentLoaded", () => {
  const importedData = sessionStorage.getItem("giraffe-import-data");
  const eduBullets = [];

  const resume = document.querySelector('.resume');
  const themeInputs = document.querySelectorAll('input[name="theme-color"]');
  const setTheme = (theme) => {
    resume.className = `resume ${theme}`;
  };

  const toggleSection = (sectionId, shouldShow) => {
    const section = document.getElementById(sectionId)?.closest('section');
    if (section) section.style.display = shouldShow ? 'block' : 'none';
  };

  if (importedData) {
    const data = JSON.parse(importedData);
    const setValue = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };

    if (data.sectionTitles) {
      const titleInputs = document.querySelectorAll('.section-title');
      data.sectionTitles.forEach((title, i) => {
        if (titleInputs[i]) titleInputs[i].value = title;
      });
    }

    const u = data.userData;
    if (u) {
      setValue('input-name', u.name);
      setValue('input-phone', u.phone);
      setValue('input-email', u.email);
      setValue('input-address', u.address);
      setValue('input-summary', u.summary);

      if (u.education?.[0]) {
        setValue('edu-school', u.education[0].school);
        setValue('edu-degree', u.education[0].degree);
        setValue('edu-gpa', u.education[0].gpa);
        setValue('edu-start', u.education[0].startDate);
        setValue('edu-end', u.education[0].endDate);
        if (Array.isArray(u.education[0].bullets)) {
          u.education[0].bullets.forEach(b => eduBullets.push(b));
        }
      }

      if (u.experience?.[0]) {
        setValue('exp-title', u.experience[0].title);
        setValue('exp-company', u.experience[0].company);
        setValue('exp-start', u.experience[0].startDate);
        setValue('exp-end', u.experience[0].endDate);
        setValue('exp-desc', u.experience[0].description);
      }

      setValue('skills-input', (u.skills || []).join(', '));
      setValue('interests-input', (u.interests || []).join(', '));

      if (u.projects?.[0]) {
        setValue('proj-title', u.projects[0].title);
        setValue('proj-desc', u.projects[0].description);
      }

      if (u.themeColor) {
        const themeInput = document.querySelector(`input[name="theme-color"][value="${u.themeColor}"]`);
        if (themeInput) {
          themeInput.checked = true;
          setTheme(u.themeColor);
        }
      } else {
        setTheme('orange');
      }
    }

    sessionStorage.removeItem("giraffe-import-data");
  } else {
    setTheme('orange');
  }

  themeInputs.forEach(input => {
    input.addEventListener('change', () => {
      if (input.checked) setTheme(input.value);
    });
  });

  const bind = (inputId, targetId, fallback = '') => {
    const input = document.getElementById(inputId);
    const target = document.getElementById(targetId);
    if (!input || !target) return;
    const update = () => {
      target.textContent = input.value.trim() || fallback;
    };
    input.addEventListener('input', update);
    update();
  };

  bind('input-name', 'name', 'Your Name');
  bind('input-phone', 'contact');
  bind('input-email', 'contact');
  bind('input-address', 'contact');

  const updateContact = () => {
    const phone = document.getElementById('input-phone')?.value.trim();
    const email = document.getElementById('input-email')?.value.trim();
    const address = document.getElementById('input-address')?.value.trim();
    const combined = [phone, email, address].filter(Boolean).join(" | ");
    document.getElementById('contact').textContent = combined || 'Phone | Email | Address';
  };

  ['input-phone', 'input-email', 'input-address'].forEach(id => {
    const input = document.getElementById(id);
    if (input) input.addEventListener('input', updateContact);
  });

  const summaryInput = document.getElementById('input-summary');
  const summaryPreview = document.getElementById('summary');
  summaryInput.addEventListener('input', () => {
    summaryPreview.textContent = summaryInput.value.trim() || '';
  });

  const bulletContainer = document.createElement('div');
  bulletContainer.id = "edu-bullets-container";
  document.querySelector('[id="edu-end"]').closest('.form-section').appendChild(bulletContainer);

  const renderEducation = () => {
    const school = document.getElementById('edu-school')?.value.trim();
    const degree = document.getElementById('edu-degree')?.value.trim();
    const gpa = document.getElementById('edu-gpa')?.value.trim();
    const start = document.getElementById('edu-start')?.value.trim();
    const end = document.getElementById('edu-end')?.value.trim();
    const bulletItems = eduBullets.filter(b => b.trim() !== '');
    const startYear = start?.split('-')[0];
    const endYear = end?.split('-')[0];
    const bulletHTML = bulletItems.length ? '<ul>' + bulletItems.map(b => `<li>${b}</li>`).join('') + '</ul>' : '';

    const educationHTML = (school || degree || gpa || start || end || bulletItems.length) ? `
      <div class="education-entry">
        <p><strong>${school}</strong> - ${degree} ${gpa ? `(GPA: ${gpa})` : ''}</p>
        <p><small>${startYear} - ${endYear}</small></p>
        ${bulletHTML}
      </div>
    ` : '';

    document.getElementById('education-section').innerHTML = educationHTML;
  };

  const addBulletBtn = document.createElement('button');
  addBulletBtn.textContent = '+ Add Achievement';
  addBulletBtn.type = 'button';
  addBulletBtn.className = 'cta-button';
  document.querySelector('[id="edu-end"]').closest('.form-section').appendChild(addBulletBtn);

  addBulletBtn.addEventListener('click', () => {
    eduBullets.push('');
    renderEduBullets();
    renderEducation();
  });

  const renderEduBullets = () => {
    bulletContainer.innerHTML = eduBullets.map((val, i) => `
      <div class="form-group">
        <input type="text" class="edu-bullet-input" data-index="${i}" value="${val}" placeholder="e.g. Dean’s List, 3 semesters" />
      </div>
    `).join('');
  };

  ['edu-school', 'edu-degree', 'edu-gpa', 'edu-start', 'edu-end'].forEach(id => {
    const input = document.getElementById(id);
    if (input) input.addEventListener('input', renderEducation);
  });

  bulletContainer.addEventListener('input', e => {
    if (e.target.classList.contains('edu-bullet-input')) {
      const index = e.target.dataset.index;
      eduBullets[index] = e.target.value;
      renderEducation();
    }
  });

  const skillsInput = document.getElementById('skills-input');
  skillsInput.addEventListener('input', () => {
    const list = skillsInput.value.split(',').map(skill => skill.trim()).filter(Boolean);
    document.getElementById('skills-list').innerHTML = list.map(skill => `<li>${skill}</li>`).join('');
  });

  const interestsInput = document.getElementById('interests-input');
  interestsInput.addEventListener('input', () => {
    const list = interestsInput.value.split(',').map(int => int.trim()).filter(Boolean);
    document.getElementById('interests-list').innerHTML = list.map(int => `<li>${int}</li>`).join('');
  });

  const projTitle = document.getElementById('proj-title');
  const projDesc = document.getElementById('proj-desc');
  const renderProject = () => {
    const title = projTitle.value.trim();
    const desc = projDesc.value.trim();
    const projectHTML = (title || desc) ? `
      <div class="project-entry">
        <p><strong>${title}</strong></p>
        <p>${desc}</p>
      </div>
    ` : '';
    document.getElementById('projects-section').innerHTML = projectHTML;
  };
  projTitle.addEventListener('input', renderProject);
  projDesc.addEventListener('input', renderProject);

  const renderExperience = () => {
    const title = document.getElementById('exp-title')?.value.trim();
    const company = document.getElementById('exp-company')?.value.trim();
    const start = document.getElementById('exp-start')?.value;
    const end = document.getElementById('exp-end')?.value;
    const desc = document.getElementById('exp-desc')?.value.trim();
    const experienceHTML = (title || company || start || end || desc) ? `
      <div class="experience-entry">
        <p><strong>${title}</strong> at ${company}</p>
        <p><small>${start?.split('-').reverse().join('/')} - ${end?.split('-').reverse().join('/')}</small></p>
        <p>${desc}</p>
      </div>
    ` : '';
    document.getElementById('experience-section').innerHTML = experienceHTML;
  };
  ['exp-title', 'exp-company', 'exp-start', 'exp-end', 'exp-desc'].forEach(id => {
    const input = document.getElementById(id);
    if (input) input.addEventListener('input', renderExperience);
  });

  const wrapper = document.querySelector('.form-sections-wrapper');
  const sections = document.querySelectorAll('.form-section');
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');
  let currentIndex = 0;

  const updateSectionView = () => {
    sections.forEach((section, index) => {
      section.classList.toggle('active', index === currentIndex);
    });
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === sections.length - 1;
  };

  const checkCurrentSection = () => {
    const activeSection = sections[currentIndex];
    if (activeSection.querySelector('#input-summary')) {
      if (!document.getElementById('input-summary').value.trim()) {
        toggleSection('summary', false);
      }
    }
    if (activeSection.querySelector('#edu-school')) {
      const school = document.getElementById('edu-school')?.value.trim();
      const degree = document.getElementById('edu-degree')?.value.trim();
      const gpa = document.getElementById('edu-gpa')?.value.trim();
      const start = document.getElementById('edu-start')?.value.trim();
      const end = document.getElementById('edu-end')?.value.trim();
      if (!school && !degree && !gpa && !start && !end && eduBullets.filter(b => b.trim()).length === 0) {
        toggleSection('education-section', false);
      }
    }
    if (activeSection.querySelector('#exp-title')) {
      const title = document.getElementById('exp-title')?.value.trim();
      const company = document.getElementById('exp-company')?.value.trim();
      const desc = document.getElementById('exp-desc')?.value.trim();
      if (!title && !company && !desc) {
        toggleSection('experience-section', false);
      }
    }
    if (activeSection.querySelector('#skills-input')) {
      const skills = document.getElementById('skills-input')?.value.trim();
      if (!skills) {
        toggleSection('skills-list', false);
      }
    }
    if (activeSection.querySelector('#interests-input')) {
      const interests = document.getElementById('interests-input')?.value.trim();
      if (!interests) {
        toggleSection('interests-list', false);
      }
    }
    if (activeSection.querySelector('#proj-title')) {
      const title = document.getElementById('proj-title')?.value.trim();
      const desc = document.getElementById('proj-desc')?.value.trim();
      if (!title && !desc) {
        toggleSection('projects-section', false);
      }
    }
  };

  nextBtn.addEventListener('click', () => {
    checkCurrentSection();
    if (currentIndex < sections.length - 1) currentIndex++;
    updateSectionView();
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) currentIndex--;
    updateSectionView();
  });

  updateContact();
  renderEduBullets();
  renderEducation();
  renderExperience();
  renderProject();
  updateSectionView();
});


// ADDITION: Download PDF
const downloadBtn = document.getElementById('download-btn');
if (downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    const element = document.querySelector('.resume');
    const opt = {
      margin: [70, 40, 70, 40],
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, logging: false, useCORS: true, scrollY: 0 },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    html2pdf().set(opt).from(element).save();
  });
}

// ADDITION: Export to .giraffe
const giraffeBtn = document.getElementById('download-giraffe-btn');
if (giraffeBtn) {
  giraffeBtn.addEventListener('click', () => {
    const getValue = id => document.getElementById(id)?.value?.trim() || "";

    const hiddenSections = Array.from(document.querySelectorAll('section')).map(section => ({
      id: section.querySelector('[id]')?.id || '',
      visible: section.style.display !== 'none'
    }));

    const data = {
      fileVersion: "1.0",
      templateName: "template4",
      userData: {
        name: getValue('input-name'),
        phone: getValue('input-phone'),
        email: getValue('input-email'),
        address: getValue('input-address'),
        summary: getValue('input-summary'),
        education: [
          {
            school: getValue('edu-school'),
            degree: getValue('edu-degree'),
            gpa: getValue('edu-gpa'),
            startDate: getValue('edu-start'),
            endDate: getValue('edu-end'),
            bullets: [...document.querySelectorAll('.edu-bullet-input')].map(b => b.value.trim()).filter(Boolean)
          }
        ],
        experience: [
          {
            title: getValue('exp-title'),
            company: getValue('exp-company'),
            startDate: getValue('exp-start'),
            endDate: getValue('exp-end'),
            description: getValue('exp-desc')
          }
        ],
        skills: getValue('skills-input').split(',').map(s => s.trim()).filter(Boolean),
        interests: getValue('interests-input').split(',').map(i => i.trim()).filter(Boolean),
        projects: [
          {
            title: getValue('proj-title'),
            description: getValue('proj-desc')
          }
        ],
        themeColor: document.querySelector('input[name="theme-color"]:checked')?.value || "orange",
        sectionTitles: [...document.querySelectorAll('.section-title')].map(input => input.value.trim()),
        sectionsState: hiddenSections
      }
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Resume.giraffe';
    a.click();
    URL.revokeObjectURL(url);
  });
}
