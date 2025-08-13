import { useContext } from "react";
import { LanguageContext } from "../../Hooks/LanguageContext";
import "./CSS/Policy.css";

const translations = {
  ge: {
    privacy: "კონფიდენციალურობა და პოლიტიკა",
    updated: "კონფიდენციალურობის პოლიტიკა (Privacy Policy) ბოლო განახლება: 2025 წლის 25 ივნისი",
    intro:
      "მოცემული კონფიდენციალურობის პოლიტიკა განსაზღვრავს, როგორ აგროვებს, იყენებს და იცავს Easy Way მომხმარებლის პერსონალურ ინფორმაციას.",
    sections: [
      {
        title:
          "1. ინფორმაცია, რომელსაც ვაგროვებთ რეგისტრაციისას ან სერვისით სარგებლობისას შეიძლება შეგვატყობინოთ შემდეგი მონაცემები:",
        list: [
          "სახელი და გვარი",
          "ელ.ფოსტის მისამართი",
          "გადახდის დეტალები (ბანკის ბარათის ტიპი, მაგრამ არა მისი სრული ნომერი)",
          "ვებსაიტზე შესრულებული შეკვეთებისა და ქმედებების ისტორია",
          "ბარათის პაკეტის არჩევანი",
        ],
      },
      {
        title:
          "2. როგორ ვიყენებთ ამ ინფორმაციას? მომხმარებლის მიერ მოწოდებული ინფორმაცია გამოიყენება შემდეგი მიზნებისთვის:",
        list: [
          "შეკვეთების დამუშავება და მიწოდება",
          "სერვისის გაწევა და ბარათის აქტივაცია",
          "ანგარიშის მართვა და მომხმარებლის იდენტიფიკაცია",
          "ტექნიკური დახმარების გაწევა",
          "მომხმარებელთან კომუნიკაცია (ელ.ფოსტით, ტელეფონით ან უშუალოდ ვებსაიტის ონლაინ ჩატიდან)",
          "გადახდის განხორციელება",
          "გარიგებების უსაფრთხოდ დამუშავება",
          "სერვისის გაუმჯობესება და ანალიტიკის მიზნები",
        ],
      },
      {
        title: "3. გადახდის პროცესის ინფორმაცია",
        text: "EasyWay არ ახორციელებს მომხმარებლის ბარათის მონაცემების უშუალო დამუშავებას.",
      },
      {
        title: "4. ინფორმაციის გაზიარება მესამე პირებთან",
        text: "Easy Way არ გადასცემს მომხმარებლის ინფორმაციას მესამე პირებს, გარდა იმ შემთხვევებისა, როდესაც:",
        list: [
          "არსებობს მომხმარებლის თანხმობა",
          "საჭიროა სერვისის გაწევისთვის (მაგალითად, პარტნიორი ობიექტის დასადასტურებლად)",
          "ამას მოითხოვს მოქმედი კანონმდებლობა ან სასამართლო",
        ],
      },
      {
        title:
          "5. მონაცემების დაცვა Easy Way იღებს გონივრულ ტექნიკურ და ორგანიზაციულ ზომებს მომხმარებლის ინფორმაციის დასაცავად:",
        list: [
          "დაცული სერვერები",
          "შეზღუდული წვდომა მომხმარებლის მონაცემებზე",
          "ჩვენ არ ვინახავთ ბარათის სრულ ინფორმაციას (CVV კოდი, სრული ნომერი და ა.შ.)",
          "მონაცემების დაშიფვრა",
        ],
      },
      {
        title: "6. მომხმარებლის უფლებები",
        text: "თქვენ გაქვთ უფლება:",
        list: [
          "მოითხოვოთ ინფორმაცია, თუ როგორ ინახება და გამოიყენება თქვენი მონაცემები",
          "მოითხოვოთ მონაცემების წაშლა ან ჩასწორება",
          "უარი თქვათ კონკრეტულ სახის მონაცემების დამუშავებაზე, მაგრამ (ამ სახის ქმედებამ შესაძლოა გამოიწვიოს შეზღუდვები საიტის რომელიმე ფუნქციონალზე)",
        ],
        extra:
          "საკონტაქტო ფორმის მეშვეობით შეგიძლიათ მოგვწეროთ ნებისმიერი მოთხოვნა, რომელიც GDPR-ს ან საქართველოს მონაცემთა დაცვის კანონმდებლობას ეხება, ან დაგვიკავშირდეთ ნომერზე 579 16 14 30",
      },
      {
        title: "7. ქუქი ფაილები (Cookies)",
        text: "Easy Way იყენებს ქუქიებს საიტის ფუნქციონირებისთვის და მომხმარებლის გამოცდილების გასაუმჯობესებლად. ქუქიების გამოყენება ავტომატურად არ ითვლის პირად იდენტიფიკაციას, მაგრამ შესაძლოა დაკავშირებული იყოს ანგარიშთან.",
      },
      {
        title: "8. კონფიდენციალურობის პოლიტიკის ცვლილებები",
        text: "ჩვენ შეიძლება დროდადრო განვაახლოთ ეს პოლიტიკა. ყველა ცვლილება ძალაში შევა განახლების თარიღიდან და გამოქვეყნდება საიტზე. თუ თანხმდებით ამ პოლიტიკას, ნიშნავს, რომ გესმით და ეთანხმებით Easy Way-ის მონაცემთა დაცვის პირობებს.",
      },
    ],
  },
  en: {
    privacy: "Privacy Policy",
    updated: "Last updated: June 25, 2025",
    intro:
      "This privacy policy outlines how Easy Way collects, uses, and protects users' personal information.",
    sections: [
      {
        title:
          "1. Information we collect — When you register or use our services, we may collect the following data:",
        list: [
          "Full name",
          "Email address",
          "Payment details (card type but not full number)",
          "Order and activity history on the website",
          "Selected card package",
        ],
      },
      {
        title:
          "2. How we use this information — The data provided by users is used for:",
        list: [
          "Processing and delivering orders",
          "Providing services and activating cards",
          "Account management and user identification",
          "Providing technical support",
          "Communicating with the user (email, phone, or live chat)",
          "Processing payments",
          "Securely handling transactions",
          "Improving services and for analytics purposes",
        ],
      },
      {
        title: "3. Payment process information",
        text: "Easy Way does not directly process users' card information.",
      },
      {
        title: "4. Sharing information with third parties",
        text: "Easy Way does not share user data with third parties except when:",
        list: [
          "User consent is given",
          "Required to provide the service (e.g., verifying with partner companies)",
          "Required by law or court order",
        ],
      },
      {
        title:
          "5. Data protection Easy Way takes reasonable technical and organizational measures to protect users' information:",
        list: [
          "Secure servers",
          "Restricted access to user data",
          "We do not store full card details (CVV, full number, etc.)",
          "Data encryption",
        ],
      },
      {
        title: "6. User rights",
        text: "You have the right to:",
        list: [
          "Request information about how your data is stored and used",
          "Request deletion or correction of data",
          "Opt out of certain types of data processing (which may limit some functionality)",
        ],
        extra:
          "You can contact us via the contact form for any requests related to GDPR or Georgian data protection law, or call us at 579 16 14 30",
      },
      {
        title: "7. Cookies",
        text: "Easy Way uses cookies to enable site functionality and improve user experience. Using cookies does not automatically mean personal identification but may be linked to your account.",
      },
      {
        title: "8. Changes to the Privacy Policy",
        text: "We may update this policy from time to time. All changes will take effect from the update date and will be published on the website. Agreeing to this policy means you understand and accept Easy Way's data protection terms.",
      },
    ],
  },
};

const Policy = () => {
  const langCtx = useContext(LanguageContext);
  if (!langCtx) throw new Error("LanguageContext.Provider is missing");
  const { language } = langCtx;

  const t = translations[language];

  return (
    <div className="policy-container">
      <h1>{t.privacy}</h1>
      <p style={{ marginBottom: "20px" }}>{t.updated}</p>
      <p style={{ marginBottom: "20px" }}>{t.intro}</p>

      {t.sections.map((section, i) => (
        <section key={i}>
          <h2>{section.title}</h2>
          {section.text && <p>{section.text}</p>}
          {section.list && (
            <ul>
              {section.list.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
          {section.extra && <p>{section.extra}</p>}
        </section>
      ))}
    </div>
  );
};

export default Policy;
