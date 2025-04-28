import MilestoneList from "../components/tasks/MilestoneList";

const Milestones = () => {
  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">Milestones</h1>
      <MilestoneList />
    </div>
  );
};

export default Milestones;
