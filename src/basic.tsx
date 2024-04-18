import React, {Component,useState} from "react";
function Basic() {
  const basicQuestions: { question:string;options:string[]}[]=[
        {
          question:'1. What is your ideal environment to live in?',
          options: ['City','Suburb','Rural','Town'],
        },
        {
          question:'2. What personal skill do you most value?',
          options: ['time management','resourceful','organization','leadership'],
        },    
        {     
          question:'3. What level of your academic career are you at?',
          options: ['some high school','high school degree/GED','college','graduate school'], 
        }, 
        {     
          question:'4. Besides career interests, what other activites interest you?',
          options: ['relaxing','art','exercise','volunteering'], 
        }, 
        {     
          question:'5. How many hours would you like to work per week?',
          options: ['20 or less','20-30','30-35','35+'], 
        },     
        {     
          question:'6. What topics or ideas spark your interest?',
          options: ['physical sciences','mathematics/engineering','history/social sciences','art'], 
        }, 
        {     
          question:'7. Would you like to work in-person, hybrid, or virtual?',
          options: ['in-person','hybrid','virtual','no-preference'], 
        },
        {
          question:'8. What time of day are you most productive?',
          options: ['early morning (5am-7am)','mid-morning (8am-11am)','afternoon (12pm-5pm)','night (after 6pm)'],
        },
        {
          question:'9. What type of company environment are you looking for?',
          options: ['high-stress, high salary', 'low stress, low salary'],
        },
        {
          question:'10. What is the highest level of education that you would like to complete?',
          options: ['high school/GED','college','Masters or PhD','trade school'],
        },
        /*{
          question:'11. On a scale from 1 to 10, how much do you value a larger salary?',
          options: [''],
        }
        {
          question:'12. On a scale from 1 to 10, how good are you at time management?',
          options:[''],
        },*/
        {
          question:'13. How many hours would you like to work per week?',
          options:['>25','25-30','30-35','35+'],
        },
        {
          question:'14. Do you enjoy learning on a constant basis?',
          options:['yes','no'],
        },
        {
          question:'15. Do you enjoy working on a team?',
          options:['yes','no','sometimes'],
        }
      ];
  return (
    <div>
      <h1>This is the Basic Quiz.</h1>
      {basicQuestions.map((question,index)=>(
        <div key={index}>
          <h2>{question.question}</h2>
          <QuestionFormatComponent options={question.options}/>
          </div>
      ))}
    </div>
  );
};
interface QuestionFormatProps{
  options: string[];
}
const QuestionFormatComponent: React.FC<QuestionFormatProps> = ({options})=>{
  const[selected,setSelected]=useState<string|null>(null);
  const optionSelect=(option:string)=>{setSelected(option);
  };
  return (
    <div>
      <p>
        Select an option:
      </p>{options.map(option=>(<label key={option}>
        <input 
        type="radio"
        value={option}
        checked={selected===option}
        onChange={()=>optionSelect(option)}
        />{option}
        </label>
        ))}
        <p>You selected: {selected}</p>
    </div>
  );
};
export default Basic;
