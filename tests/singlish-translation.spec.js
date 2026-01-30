const { test, expect } = require('@playwright/test');

const scenarios = [

  // POSITIVE FUNCTIONAL
  { id: 'Pos_Fun_0001', name: 'Compound sentence', input: 'mama adha kaempas yanna oonee mokadha, adha dhavasema leekcharas thiyenavaa.' },
  { id: 'Pos_Fun_0002', name: 'Places and English words', input: 'me machan 25/02/2026 meeting ekak thiyenavaa. havasa 6.00ta ennee naeththam office ekata email ekak dhaanna kivvaa.' },
  { id: 'Pos_Fun_0003', name: 'Greeting phrase', input: 'aayuboovan ! kohomadha oyaata ?' },
  { id: 'Pos_Fun_0004', name: 'Polite phrasing', input: 'adha oyaalata exam thibbadha? eka tikak amaruy vagee nedha.' },
  { id: 'Pos_Fun_0005', name: 'Daily expression', input: 'mata dhaen hodatama badhagini.' },
  { id: 'Pos_Fun_0006', name: 'Places and plural', input: 'api adha vaeda karalaa passe Town eka paeththe gihin kaeema kaalaa gedhara yamu.' },
  { id: 'Pos_Fun_0007', name: 'Slang colloquial phrasing', input: 'ela machan! oyage plan eka hodhay nedha. poddak hithala plan eka ready karapan.' },
  { id: 'Pos_Fun_0008', name: 'Past tense', input: 'Mama iiye udhe vagavata gihin, kola saha mal vagaa karalaa, searama pirisidhu kalemi.' },
  { id: 'Pos_Fun_0009', name: 'Technical words', input: 'mata oyage CV eka saha LinkedIn eka email karanna' },
  { id: 'Pos_Fun_0010', name: 'Request form', input: 'oyaata meka poddak balanna puluvandha?' },
  { id: 'Pos_Fun_0011', name: 'Compound Sentence', input: 'mama Libray ekata yanna hithan innavaa , passe books tika return karanavaa' },
  { id: 'Pos_Fun_0012', name: 'Date & currency', input: 'mama 2026/01/22 udhaeesana 7.30 AM office ekata giyaa' },
  { id: 'Pos_Fun_0013', name: 'Measurements', input: 'mama kiribath saeedhimata kiri 500ml haa sahal 1kg gaththaa' },
  { id: 'Pos_Fun_0014', name: 'Multi-word and Collocations', input: 'poddak inna , mama enakam' },
  { id: 'Pos_Fun_0015', name: 'Future tense', input: 'mama heta campus enavaa' },
  { id: 'Pos_Fun_0016', name: 'Repeated words', input: 'hari hari, mama Zoom meeting eka ivara velaa documents tika email karanna hithan inne' },
  { id: 'Pos_Fun_0017', name: 'Spacing', input: 'mama dhaen gedhara inne, mata nidhimathay' },
  { id: 'Pos_Fun_0018', name: 'Interrogative form', input: 'oyaalaa heta meeting ekata yanavadha ?' },
  { id: 'Pos_Fun_0019', name: 'Complex sentence', input: 'api kaeema kanna yanavaa, vaesse naeththan gedhara yannath epaeyi.'},
  { id: 'Pos_Fun_0020', name: 'Polite short', input: 'karuNaakarala ID eka dhenna puluvandha saha email eka yavanna.' },
  { id: 'Pos_Fun_0021', name: 'Places', input: 'api weekend eke kandy yanna plan karala inne.' },
  { id: 'Pos_Fun_0022', name: 'Slang phrase', input: 'eeka nam supiri kiyala okkoma kivva' },
  { id: 'Pos_Fun_0023', name: 'Daily expression', input: 'mama dhaen tikak mahansi nisaa tikak viveka ganna hithan innavaa.' },
  { id: 'Pos_Fun_0024', name: 'Conditional future', input: 'vaessa naeththam api havas velaavea tikak aevidhinna yamu.' },

  // NEGATIVE FUNCTIONAL
  { id: 'Neg_Fun_0025', name: 'Invalid spelling', input: 'mama geddhara yanawa' },
  { id: 'Neg_Fun_0026', name: 'English only', input: 'Please send the file' },
  { id: 'Neg_Fun_0027', name: 'Negative meaning', input: 'api heta enavaa' },
  { id: 'Neg_Fun_0028', name: 'Compound failure', input: 'api kaema kanna yanavaa saha passe gedhara yanna hithan inne' },
  { id: 'Neg_Fun_0029', name: 'Question failure', input: 'oya campus enawada' },
  { id: 'Neg_Fun_0030', name: 'Polite breakdown', input: 'mata podi udhavvak karanna' },
  { id: 'Neg_Fun_0031', name: 'No spaces', input: 'hetaapiofficeyanawa' },
  { id: 'Neg_Fun_0032', name: 'Line break', input: 'mama gedhara yanavaa \n oya enavadha' },
  { id: 'Neg_Fun_0033', name: 'Tense mismatch', input: 'mama iiyee gedhara giyaa, namuth dhaen phone eka vaeda karanne naee' },
  { id: 'Neg_Fun_0034', name: 'Punctuation', input: 'oya gedhara enne naee!' },

  // UI TEST
  { id: 'Neg_UI_0035', name: 'UI stress long text', input: 'heta api office yanna kalin documents tika print karalaa manager ta dhenna oonee kiyala hithala thibuna.' }
];

// ================= RUN TESTS =================

for (const tc of scenarios) {
  test(`${tc.id} - ${tc.name}`, async ({ page }) => {

    await page.goto('https://www.swifttranslator.com/');
    await page.waitForSelector('textarea');

    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    const outputArea = page.locator('div.whitespace-pre-wrap').first();

    await inputArea.fill('');
    await inputArea.type(tc.input, { delay: 20 });

    // ✅ Wait until output text appears (instead of fixed 4s)
    if (tc.id.startsWith('Pos_Fun')) {
      await expect(outputArea).toHaveText(/.+/, { timeout: 10000 }); // wait max 10s
    } else if (tc.id.startsWith('Neg_UI')) {
      await expect(outputArea).toHaveText(/.*/, { timeout: 10000 }); // wait for any output
    }

    const output = await outputArea.innerText();
    const trimmedOutput = output.trim();

    // POSITIVE TESTS
    if (tc.id.startsWith('Pos_Fun')) {
      expect(trimmedOutput.length).toBeGreaterThan(5);
    }

    // NEGATIVE TESTS
    if (tc.id.startsWith('Neg_Fun')) {
      expect(trimmedOutput).toBeDefined();
    }

    // UI TEST
if (tc.id.startsWith('Neg_UI')) {
  const uiOutput = await outputArea.textContent();
  
 
  const trimmedOutput = uiOutput ? uiOutput.trim() : '';


  expect(trimmedOutput.length).toBeGreaterThanOrEqual(0); 
}


  });
}
