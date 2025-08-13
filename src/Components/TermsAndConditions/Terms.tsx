import { useContext } from "react";
import { LanguageContext } from "../../Hooks/LanguageContext";
import "./CSS/Terms.css";

const translations = {
  ge: {
    title: "წესები და პირობები",
    lastUpdate: "წესები და პირობები (Terms and Conditions) ბოლო განახლება: 2025 წლის 25 ივნისი",
    intro: "გთხოვთ, ყურადღებით წაიკითხოთ ეს წესები და პირობები, სანამ ისარგებლებთ Easy Way-ს ვებსაიტით და სერვისებით.",
    sections: {
      generalTitle: "1. ზოგადი ინფორმაცია",
      generalText:
        "საიტი Easy Way წარმოადგენს ფასდაკლების ბარათების სერვისს, რომელიც მომხმარებლებს სთავაზობს სპეციალურ შეთავაზებებს პარტნიორ კომპანიებთან. Easy Way არ წარმოადგენს უშუალოდ მომსახურების მიმწოდებელს, არამედ აკავშირებს მომხმარებელს პარტნიორ ობიექტებთან.",

      registrationTitle: "2. რეგისტრაცია და ანგარიშის შექმნა",
      registrationText:
        "სერვისით სარგებლობისთვის აუცილებელია ანგარიშის შექმნა. რეგისტრაციისას მომხმარებელი ვალდებულია მიაწოდოს ზუსტი და სრული ინფორმაცია და ასევე პასუხისმგებელია თავისი ანგარიშის კონფიდენციალურობის დაცვაზე. წინააღმდეგ შემთხვევაში EasyWay არ არის პასუხისმგებელი მომხდარ შედეგებზე",

      paymentTitle: "3. ბარათების შეძენა და გადახდის პირობები",
      paymentText1: "Easy Way-ის ფასდაკლების ბარათების შეძენა ხდება შემდეგი ვადებით:",
      paymentList: ["1 თვიანი", "6 თვიანი", "12 თვიანი"],
      paymentText2:
        "გადახდა ხდება მხოლოდ ონლაინ, მოქმედი საბანკო ბარათით. ბარათის შეძენის შემდეგ თანხა არ ითვლება დაბრუნებულად.",

      discountTitle: "4. ფასდაკლებების პირობები",
      discountText1:
        "ფასდაკლების პროცენტები დამოკიდებულია მომხმარებლის მიერ შეძენილი პროდუქციის/მომსახურების ღირებულებაზე:",
      discountList: [
        "1-100 ლარამდე — 30% ფასდაკლება",
        "100-300 ლარამდე — 20% ფასდაკლება",
        "300 ლარზე მეტი — 10% ფასდაკლება"
      ],
      discountText2: "ფასდაკლება ვრცელდება მხოლოდ Easy Way-ის პარტნიორ ობიექტებზე.",

      thirdPartyTitle: "5. მესამე მხარეები და პასუხისმგებლობის შეზღუდვა",
      thirdPartyText:
        "Easy Way თანამშრომლობს სხვადასხვა ბიზნეს ობიექტთან, თუმცა არ იღებს პასუხისმგებლობას მათი მომსახურების ხარისხზე, შეცდომებზე, შეფერხებებსა და სხვა დაუგეგმავ შემთხვევებზე.",

      dataTitle: "6. პერსონალური მონაცემების დაცვა",
      dataText:
        "თქვენი პერსონალური მონაცემები (რეგისტრაციის დროს მოწოდებული ინფორმაცია) დაცულია Easy Way-ის მიერ და არ გადაეცემა მესამე პირებს მომხმარებლის წინასწარი თანხმობის გარეშე, გარდა კანონით გათვალისწინებული შემთხვევებისა.",

      changesTitle: "ცვლილებები წესებსა და პირობებში",
      changesText1:
        "Easy Way იტოვებს უფლებას ნებისმიერ დროს შეიტანოს ცვლილებები ამ დოკუმენტში. ცვლილების ძალაში შესვლის თარიღი მიუთითება წესების თავში.",
      changesText2:
        "თუ დაეთანხმებით ამ წესებსა და პირობებს, მიიღებთ წვდომას Easy Way-ის სერვისებზე. სერვისის გამოყენება ნიშნავს, რომ ეთანხმებით და იცნობთ აღნიშნულ პირობებს."
    }
  },

  en: {
    title: "Terms and Conditions",
    lastUpdate: "Terms and Conditions - Last updated: June 25, 2025",
    intro: "Please read these Terms and Conditions carefully before using Easy Way's website and services.",
    sections: {
      generalTitle: "1. General Information",
      generalText:
        "Easy Way is a discount card service that offers users special deals with partner companies. Easy Way does not directly provide services but connects users with partner establishments.",

      registrationTitle: "2. Registration and Account Creation",
      registrationText:
        "To use the service, you must create an account. When registering, you must provide accurate and complete information and are responsible for keeping your account details confidential. Otherwise, Easy Way is not responsible for any consequences.",

      paymentTitle: "3. Card Purchase and Payment Terms",
      paymentText1: "Easy Way discount cards can be purchased for the following periods:",
      paymentList: ["1 month", "6 months", "12 months"],
      paymentText2:
        "Payment is made only online via a valid bank card. Once purchased, the amount is non-refundable.",

      discountTitle: "4. Discount Terms",
      discountText1:
        "Discount percentages depend on the value of the purchased product/service:",
      discountList: [
        "1-100 GEL — 30% discount",
        "100-300 GEL — 20% discount",
        "Over 300 GEL — 10% discount"
      ],
      discountText2: "Discounts apply only to Easy Way's partner establishments.",

      thirdPartyTitle: "5. Third Parties and Liability",
      thirdPartyText:
        "Easy Way cooperates with various business entities but does not take responsibility for the quality of their services, errors, delays, or other unforeseen events.",

      dataTitle: "6. Personal Data Protection",
      dataText:
        "Your personal data (information provided during registration) is protected by Easy Way and will not be shared with third parties without prior consent, except as required by law.",

      changesTitle: "Changes to Terms and Conditions",
      changesText1:
        "Easy Way reserves the right to change this document at any time. The effective date of the change will be stated at the top of the terms.",
      changesText2:
        "If you agree to these terms, you will gain access to Easy Way's services. Using the service means you agree to and understand these terms."
    }
  }
};

const Policy = () => {
  const langCtx = useContext(LanguageContext);
  if (!langCtx) throw new Error("LanguageContext.Provider is missing");
  const { language } = langCtx;

  const t = translations[language];

  return (
    <div className="terms-container">
      <h1>{t.title}</h1>
      <p style={{ marginBottom: "20px" }}>{t.lastUpdate}</p>
      <p style={{ marginBottom: "20px" }}>{t.intro}</p>

      <section>
        <h2>{t.sections.generalTitle}</h2>
        <p>{t.sections.generalText}</p>
      </section>

      <section>
        <h2>{t.sections.registrationTitle}</h2>
        <p>{t.sections.registrationText}</p>
      </section>

      <section>
        <h2>{t.sections.paymentTitle}</h2>
        <p>{t.sections.paymentText1}</p>
        <ul>
          {t.sections.paymentList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <p>{t.sections.paymentText2}</p>
      </section>

      <section>
        <h2>{t.sections.discountTitle}</h2>
        <p>{t.sections.discountText1}</p>
        <ul>
          {t.sections.discountList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <p>{t.sections.discountText2}</p>
      </section>

      <section>
        <h2>{t.sections.thirdPartyTitle}</h2>
        <p>{t.sections.thirdPartyText}</p>
      </section>

      <section>
        <h2>{t.sections.dataTitle}</h2>
        <p>{t.sections.dataText}</p>
      </section>

      <section>
        <h2>{t.sections.changesTitle}</h2>
        <p>{t.sections.changesText1}</p>
        <p>{t.sections.changesText2}</p>
      </section>
    </div>
  );
};

export default Policy;
