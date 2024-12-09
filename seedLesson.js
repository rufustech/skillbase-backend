const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Lesson = require("./models/lessonModel"); // Assuming you have this file as the lesson model

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const seedLessons = async () => {
  const lessons = [
    {
      title: "Emergency Response Procedures",
      content: `
        ### Emergency Response Procedures in Mining

        Mining emergencies can happen unexpectedly. A well-prepared response plan is critical for saving lives. Follow these steps when responding to emergencies:

        1. **Alerting the Authorities**: Immediately contact emergency services and report the incident.
        2. **Evacuation Plan**: Ensure everyone is evacuated from dangerous zones. Follow the designated escape routes.
        3. **First Aid**: Administer basic first aid to injured workers until professional medical teams arrive.
        4. **Communication**: Maintain communication with emergency teams and other workers to ensure everyone’s safety.

        Always stay calm and use the right protective gear when responding to emergencies to minimize the risk of injury or fatalities.
      `,
      course: "6754dc0820cc0bed32e1ccc7", // ID of "Emergency Preparedness in Mining"
    },
    {
      title: "Sustainable Mining Practices",
      content: `
        ### Sustainable Mining Practices

        Mining has a significant impact on the environment. By adopting sustainable practices, we can minimize this impact while maintaining operational efficiency. Key sustainable practices include:

        1. **Waste Management**: Properly disposing of or recycling mining waste helps reduce environmental contamination.
        2. **Energy Efficiency**: Implementing energy-efficient technologies and renewable energy sources can significantly reduce carbon footprints.
        3. **Water Conservation**: Water is a valuable resource; recycling water in mining operations ensures its efficient use.
        4. **Rehabilitation of Mine Sites**: Once mining operations are complete, the land should be rehabilitated to restore its natural state as much as possible.

        Sustainable practices help reduce environmental damage and ensure the longevity of mining operations.
      `,
      course: "6754dc0820cc0bed32e1ccc8", // ID of "Environmental Impact and Sustainability"
    },
    {
      title: "Electrical Hazard Identification",
      content: `
        ### Electrical Hazard Identification in Mining

        Mining operations often involve the use of electrical equipment, which can pose serious risks. Identifying and addressing electrical hazards can prevent injuries and fatalities. Common electrical hazards include:

        1. **Exposed Wiring**: Wiring that is not properly insulated can lead to electrocution. Always ensure electrical wiring is shielded and inspected regularly.
        2. **Overloaded Circuits**: Overloading circuits can cause fires and damage equipment. Ensure that circuits are never overloaded beyond their capacity.
        3. **Wet Environments**: Water and electricity do not mix. Always ensure that electrical systems are dry and adequately protected from moisture to avoid electrical shocks.
        4. **Incorrect Grounding**: Electrical systems should be grounded to avoid electric shocks. Regularly check grounding systems to ensure they are functioning properly.

        Routine inspections and preventative maintenance help avoid electrical hazards and maintain a safe working environment.
      `,
      course: "6754dc0820cc0bed32e1ccc9", // ID of "Electrical Safety in Mining"
    },
    {
      title: "Safe Handling of Explosives",
      content: `
        ### Safe Handling of Explosives

        Explosives are essential in mining, especially for blasting operations. However, they pose significant risks. Follow these guidelines to safely handle explosives:

        1. **Storage**: Store explosives in secure, cool, and dry places to prevent accidental detonation. They should never be stored near other hazardous materials.
        2. **Transportation**: When transporting explosives, use designated routes and vehicles. Always follow the safety protocols for safe transportation.
        3. **Use**: Ensure that only trained personnel handle explosives, and always adhere to strict safety measures when preparing and detonating explosives.
        4. **Inspection**: Regularly inspect explosive materials for damage or defects. Dispose of any damaged explosives according to safety guidelines.

        Safe handling and storage of explosives are essential for preventing accidents in the mining industry.
      `,
      course: "6754dc0820cc0bed32e1ccca", // ID of "Explosive Handling and Storage"
    },
    {
      title: "Traffic Control on Mine Sites",
      content: `
        ### Traffic Control on Mine Sites

        The movement of vehicles and personnel on mine sites must be carefully managed to avoid accidents. Key strategies include:

        1. **Designated Routes**: Mark clear routes for vehicles and workers. Pedestrian walkways should be separated from vehicle paths wherever possible.
        2. **Speed Limits**: Enforce speed limits within mine sites to reduce the risk of collisions and accidents.
        3. **Traffic Signage**: Use clear and visible signage to direct traffic flow and indicate hazardous areas.
        4. **Vehicle Inspections**: Ensure all vehicles are regularly inspected to ensure they are in safe working condition.

        Effective traffic management ensures smooth operations and the safety of all workers on mine sites.
      `,
      course: "6754dc0820cc0bed32e1ccc7", // ID of "Mine Site Traffic Management"
    },
    {
      title: "PPE Usage and Maintenance",
      content: `
        ### Personal Protective Equipment (PPE) Usage and Maintenance

        Personal protective equipment (PPE) is essential for worker safety. Here are some key points to ensure proper usage and maintenance of PPE:

        1. **Helmet**: Always wear a helmet to protect the head from falling objects.
        2. **Gloves**: Use gloves to protect your hands from cuts, burns, and hazardous materials.
        3. **Boots**: Wear boots with steel toes to protect feet from heavy objects and sharp debris.
        4. **Hearing Protection**: In noisy environments, always wear ear protection to prevent hearing loss.
        5. **Respirators**: In dusty or toxic environments, wear a respirator to protect against harmful inhalants.

        Inspect PPE regularly for damage, and replace worn or damaged items immediately to ensure full protection.
      `,
      course: "6754dc0820cc0bed32e1ccc6", // ID of "Personal Protective Equipment (PPE) in Mining"
    },
    {
      title: "Identifying Workplace Hazards",
      content: `
        ### Identifying Workplace Hazards in Mining

        Identifying and addressing hazards before they cause harm is essential for maintaining a safe mining environment. Common workplace hazards include:

        1. **Physical Hazards**: These include falls, moving equipment, and high noise levels. Ensure that areas are clear of obstacles and proper signage is in place.
        2. **Chemical Hazards**: Exposure to chemicals can occur in processing or handling materials. Use proper PPE and ventilation to reduce exposure.
        3. **Ergonomic Hazards**: Repetitive strain injuries can result from improper posture or lifting techniques. Encourage proper ergonomics and regular breaks.
        4. **Psychosocial Hazards**: Stress and fatigue can lead to accidents. Ensure that workers have proper rest and a supportive work environment.

        Conduct regular hazard assessments to identify risks and implement corrective actions.
      `,
      course: "6754dc0820cc0bed32e1ccc5", // ID of "Hazard Identification in Mining"
    },
    {
      title: "Basic First Aid in Mining",
      content: `
        ### Basic First Aid in Mining

        In mining, accidents can happen at any time. Quick and effective first aid can save lives. Basic first aid steps include:

        1. **CPR**: Perform CPR on victims of cardiac arrest and continue until medical professionals arrive.
        2. **Wound Care**: For cuts and abrasions, clean the wound, apply antiseptic, and bandage it properly.
        3. **Burns**: For minor burns, apply cool water immediately and cover the burn with a sterile bandage.
        4. **Fractures**: For broken bones, immobilize the limb and seek immediate medical help.

        Ensure all workers are trained in basic first aid so that they can respond swiftly in emergencies.
      `,
      course: "6754dc0820cc0bed32e1ccce", // ID of "First Aid and Health in Mining"
    },
    {
      title: "Handling Mining Chemicals Safely",
      content: `
        ### Handling Mining Chemicals Safely

        Mining operations often involve hazardous chemicals. Handling them safely is crucial for protecting both workers and the environment. Key guidelines include:

        1. **Storage**: Store chemicals in secure, labeled containers and away from other incompatible materials.
        2. **Use**: Always use proper PPE, including gloves, goggles, and respirators, when handling chemicals.
        3. **Spill Management**: Have spill kits available and ensure workers are trained to handle chemical spills.
        4. **Disposal**: Dispose of chemicals in accordance with environmental regulations to prevent contamination.

        Implementing safe chemical handling practices helps protect both workers and the environment.
      `,
      course: "6754dc0820cc0bed32e1cccf", // ID of "Chemical Safety in Mining"
    },
    {
      title: "Safety in Surface Mining",
      content: `
        ### Safety in Surface Mining

        Surface mining poses unique safety challenges. Some critical safety measures include:

        1. **Slope Stability**: Regularly monitor and reinforce slopes to prevent landslides.
        2. **Machinery Safety**: Ensure machinery is properly maintained to prevent malfunctions or accidents.
        3. **Blast Safety**: Keep personnel clear of blast zones during controlled explosions.
        4. **Dust Control**: Implement dust suppression techniques to protect workers from respiratory issues.

        These measures help maintain a safe environment for workers in surface mining operations.
      `,
      course: "6754dc0820cc0bed32e1cccd", // ID of "Surface Mining Safety"
    },
    {
      title: "Safety Measures for Underground Mining",
      content: `
        ### Safety Measures for Underground Mining

        Underground mining presents unique hazards. Ensuring the safety of workers requires:

        1. **Ventilation**: Ensure adequate ventilation to provide fresh air and remove hazardous gases.
        2. **Structural Integrity**: Regularly inspect tunnels and shafts for structural integrity to prevent collapses.
        3. **Emergency Evacuation**: Ensure workers are trained in emergency evacuation procedures.
        4. **Gas Detection**: Install gas detectors to monitor for toxic gases such as methane and carbon monoxide.

        These measures help ensure the safety of all personnel working underground.
      `,
      course: "6754dc0820cc0bed32e1cccc", // ID of "Underground Mining Safety"
    },
  ];

  try {
    // Delete existing lessons (optional, if you want to reset data)
    await Lesson.deleteMany();

    // Create new lessons
    const createdLessons = await Lesson.insertMany(lessons);
    console.log("Lessons successfully created:", createdLessons);
  } catch (error) {
    console.error("Error creating lessons:", error);
  }
};

seedLessons();

