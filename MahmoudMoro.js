(function (Scratch) {
    'use strict';
    // I LOVE CATS
    
    const catFacts = [
      "Did you know that Mahmoud is the most popular boy in the school!",
      "Did you know that Mahmoud is really kind to his enemies also?!",
      "Did you know that Mahmoud's last name is Moro!",
      "Did you know that Mahmoud's dumbest friend is Furkan Selim Kucukaslan?! And Furkan is the finder of BobIsAI, it's soooooooo stupid :P",
      "Did you know that Mahmoud can get a girlfriend in any seconds, because every girl in his school, loves him as fuck!",
      "English or Spanish, Who ever moves first is gay, bitchass mf",
    ];
    
    let catBreeds = [
      'Abyssinian',
      'American Bobtail',
      'American Curl',
      'American Shorthair',
      'American Wirehair',
      'Balinese',
      'Bengal',
      'Birman',
      'Bombay',
      'British Shorthair',
      'Burmese',
      'Chartreux',
      'Cornish Rex',
      'Devon Rex',
      'Egyptian Mau',
      'Exotic Shorthair',
      'Havana Brown',
      'Himalayan',
      'Japanese Bobtail',
      'Maine Coon',
      'Manx',
      'Norwegian Forest',
      'Ocicat',
      'Persian',
      'Ragdoll',
      'Russian Blue',
      'Scottish Fold',
      'Siamese',
      'Siberian',
      'Sphynx'
    ];
    
    const languagesmahmoud = [
        "German",
        "English",
        "African"
    ]

    class CAT {
      getInfo() {
        return {
          id: '6elovesmahmoud',
          name: 'MAHMOUD MORO',
          color1: '#4f1900',
          color2: '#b83a00',
          color3: '#b83a00',
          blocks: [
            {
              opcode: 'randommahmoudfacts',
              blockType: Scratch.BlockType.REPORTER,
              text: 'random Mahmoud Moro facts',
              disableMonitor: true,
            },
            {
              opcode: 'catscool',
              blockType: Scratch.BlockType.BOOLEAN,
              text: 'does every girl in his school loves him?',
              disableMonitor: true,
            },
            {
                opcode: 'ismahmoudgay',
                blockType: Scratch.BlockType.BOOLEAN,
                text: 'is Mahmoud Moro gay?',
                disableMonitor: true,
            },
            {
                opcode: 'englishorspanish',
                blockType: Scratch.BlockType.REPORTER,
                text: 'English or Spanish?',
                disableMonitor: true,
                arguments: {
                    FORMAT: {
                      type: Scratch.ArgumentType.STRING,
                      menu: 'TEST'
                    }
                  }
            },
            {
              opcode: 'machmoudlanguagesomg',
              blockType: Scratch.BlockType.REPORTER,
              text: 'does Mahmoud know [BREED]',
              disableMonitor: true,
              arguments: {
                BREED: {
                  type: Scratch.ArgumentType.STRING,
                  menu: 'BREED_MENU'
                }
              }
            }
          ],
          menus: {
            BREED_MENU: {
              acceptReporters: true,
              items: languagesmahmoud
            }
          }
        };
      }
    
      randomcatfact(args) {
        if (args.FORMAT == "source 1 (meowfacts)") {
          return fetch("https://meowfacts.herokuapp.com/")
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('Network response was not OK.');
              }
            })
            .then((data) => {
              return String(data.data);
            })
            .catch((error) => {
              console.error(error);
              return 'Uh oh! Something went wrong.';
            });
          } else if (args.FORMAT == "source 2 (catfact.ninja)") {
          return fetch("https://catfact.ninja/fact")
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('Network response was not OK.');
              }
            })
            .then((data) => {
              return String(data.fact);
            })
            .catch((error) => {
              console.error(error);
              return 'Uh oh! Something went wrong.';
            });
        } else if (args.FORMAT == 'mahmoud facts') {
          return catFacts[Math.floor(Math.random() * catFacts.length)]
        }
      }
      catscool() {
        return true
      }
      ismahmoudgay() {
        return false
      }

      englishorspanish() {
        return "Who ever moves first, is gay."
      }

      randommahmoudfacts() {
        return catFacts[Math.floor(Math.random() * catFacts.length)]
      }

      machmoudlanguagesomg() {
        return "Yes, he does!"
      }

      catinfo(args) {
        if (!catBreeds.includes(args.BREED)) {
          // `args.BREED` is not any of the cat breeds in the `catBreeds` array
          return "I won't let you exploit this."
        }
      
        var breedsWithoutCat = [
          "American Bobtail",
          "American Curl",
          "American Shorthair",
          "American Curlhair",
          "American Wirehair",
          "Birman",
          "British Shorthair",
          "Chartreux",
          "Cornish Rex",
          "Devon Rex",
          "Egyptian Mau",
          "Exotic Shorthair",
          "Havana Brown",
          "Japanese Bobtail",
          "Maine Coon",
          "Norwegian Forest",
          "Ocicat",
          "Oriental",
          "Ragdoll",
          "Russian Blue",
          "Scottish Fold"
        ];
      
        var breed = args.BREED
        var includeCat = breedsWithoutCat.includes(breed);
      
        if (!includeCat) {
          breed += " cat";
        }
      
        return fetch("https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=1&titles=" + encodeURIComponent(breed) + "&explaintext=1&exsectionformat=plain&format=json&origin=*")
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Network response was not OK.');
            }
          })
          .then((data) => {
            // Extract the relevant information from the data object
            const pageId = Object.keys(data.query.pages)[0];
            let extract = data.query.pages[pageId].extract;
            extract = extract.replace(/\s{2,}/g, ' ');
            return extract.split('.').slice(0, 2).join('.') + '. (https://en.wikipedia.org/wiki/' + breed.replace(/\s/g, '_') + ")";
          })
          .catch((error) => {
            console.error(error);
            return 'Uh oh! Something went wrong.';
          });
        
      }
    }
    Scratch.extensions.register(new CAT());
  })(Scratch);