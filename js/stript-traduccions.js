async function changeLanguage(lang) {
          const imageMap = {     
              'cat': '/assets/banergaspebre.jpg',      
          };

          document.documentElement.lang = lang;

          const imgElement = document.querySelector('#header-image img');
          if (imgElement && imageMap[lang]) {
              imgElement.src = imageMap[lang];
          }

          localStorage.setItem('selectedLang', lang);
          
          const response = await fetch('/assets/translations.json');
          const translations = await response.json();
          const dict = translations[lang];

          document.querySelectorAll('[data-i18n]').forEach(el => {
              const key = el.getAttribute('data-i18n');
              if (dict[key]) el.innerHTML = dict[key];
          });

          const titleEl = document.querySelector('title[data-i18n]');
            if (titleEl) {
                const key = titleEl.getAttribute('data-i18n');
                if (dict[key]) titleEl.textContent = dict[key];
            }

          document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const key = el.getAttribute('data-i18n-placeholder');
                if (dict[key]) {
                    el.setAttribute('data-placeholder', dict[key]);
                }
            });

          const customAmount = document.getElementById('custom-amount');
            if (customAmount) {
                const newPlaceholder = customAmount.getAttribute('data-placeholder');

                if (
                    customAmount.getAttribute('data-showing-placeholder') === 'true' ||
                    customAmount.classList.contains('placeholder-visible')
                ) {
                    customAmount.textContent = newPlaceholder;
                    customAmount.setAttribute('data-showing-placeholder', 'true');
                    customAmount.classList.add('placeholder-visible');
                }

                else if (customAmount.textContent.trim() === '') {
                    customAmount.textContent = newPlaceholder;
                    customAmount.setAttribute('data-showing-placeholder', 'true');
                    customAmount.classList.add('placeholder-visible');
                }
            }

          document.querySelectorAll('[data-i18n-link="true"]').forEach(el => {
              const href = new URL(el.getAttribute('href'), window.location.origin);
              href.searchParams.set('lang', lang);
              el.setAttribute('href', href.toString());
          });
      
      const form = document.getElementById("WebToLeadForm");
        if (form) {
            const redirectMap = {
                'cat': 'https://stopgaspebre.cat/gracies'
            };

            const redirectKoMap = {
                'cat': 'https://stopgaspebre.cat/error'
            };

            if (redirectMap[lang]) {
                form.querySelector('#redirect_url').value = `${redirectMap[lang]}?lang=${lang}`;
            }
            if (redirectKoMap[lang]) {
                form.querySelector('#redirect_ko_url').value = redirectKoMap[lang];
            }
        }

        const encodedGeneral = encodeURIComponent(dict.share_message);
        const encodedTwitter = encodeURIComponent(dict.share_twitter);

        document.getElementById("share-whatsapp")?.setAttribute("href", `https://wa.me/?text=${encodedGeneral}`);
        document.getElementById("share-telegram")?.setAttribute("href", `https://t.me/share/url?url=https://stopgaspebre.cat/&text=${encodedGeneral}`);
        document.getElementById("share-twitter")?.setAttribute("href", `https://twitter.com/intent/tweet?text=${encodedTwitter}`);
        document.getElementById("share-facebook")?.setAttribute("href", `https://www.facebook.com/sharer/sharer.php?u=https://stopgaspebre.cat/&quote=${encodedGeneral}`);
        document.getElementById("share-linkedin")?.setAttribute("href", `https://www.linkedin.com/sharing/share-offsite/?url=https://stopgaspebre.cat`);
    }

      window.addEventListener('DOMContentLoaded', () => {
          const urlParams = new URLSearchParams(window.location.search);
          let lang = urlParams.get('lang') || localStorage.getItem('selectedLang') || 'cat';
          changeLanguage(lang);
      });
