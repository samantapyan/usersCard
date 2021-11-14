import './style.scss';

import UsersTable from './components/UsersTable/UsersTable'

function UserCardApp() {
  return (
    <div className="primary-page d-block">
        <div>
            <UsersTable/>
        </div>

    </div>
  );
}

export default UserCardApp;
