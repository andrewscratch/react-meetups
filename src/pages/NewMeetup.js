import { useNavigate } from 'react-router-dom';
import NewMeetupForm from '../components/meetups/NewMeetupForm';

function NewMeetupPage() {
  const navigate = useNavigate();

  function onAddMeetupHandler(meetupData) {
    fetch(
      'https://react-udemy-a1a92-default-rtdb.europe-west1.firebasedatabase.app/meetups.json',
      {
        method: 'POST',
        body: JSON.stringify(meetupData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(() => {
      navigate('/');
    });
  }

  return (
    <section>
      <h1>Add Meetups Page</h1>
      <NewMeetupForm onAddMeetup={onAddMeetupHandler} />
    </section>
  );
}

export default NewMeetupPage;
