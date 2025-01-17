import React, {useState} from 'react';
import { useBeers } from '../hooks/useBeers';
import { useFavorites } from '../hooks/useFavorites';
import BeerList from '../components/BeerList';
import Filters from '../components/Filters';
import Sorting from '../components/Sorting';
import Modal from "../components/Modal.tsx";
import CreateBeerForm from "./CreateBeerForm.tsx";

const BeersPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateMode, setIsCreateMode] = useState(true);

    const {
        beers,
        suggestions,
        searchQuery,
        abvFilter,
        sortOption,
        isAscending,
        setBeers,
        setSearchQuery,
        setAbvFilter,
        setSortOption,
        setIsAscending,
        handleDelete,
    } = useBeers();

    const { favorites, handleToggleFavorite } = useFavorites();

    const handleCreate = (newBeer: any) => {
        console.log('Created:', newBeer);
        // Update the beers state with the new beer
        setBeers((prevBeers: any[]) => [newBeer, ...prevBeers]);
        setIsModalOpen(false); // Close modal after creating
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='main'>
            <h1>Beers</h1>
            <div className='filterAndSort'>
                <button
                    onClick={() => {
                        setIsCreateMode(true);
                        setIsModalOpen(true);
                    }}
                >
                    Add New Beer
                </button>

                {/*<button onClick={() => navigate('/beers/create')}>*/}
                {/*    Add New Beer*/}
                {/*</button>*/}
                <Filters
                    searchQuery={searchQuery}
                    abvFilter={abvFilter}
                    suggestions={suggestions}
                    onSearchChange={setSearchQuery}
                    onAbvChange={setAbvFilter}
                    onClear={() => {
                        setSearchQuery('');
                        setAbvFilter('');
                    }}
                />
                <Sorting
                    sortOption={sortOption}
                    isAscending={isAscending}
                    onSortChange={setSortOption}
                    onToggleOrder={() => setIsAscending((prev) => !prev)}
                />
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                title={isCreateMode ? 'Create Beer' : 'Update Beer'}
            >
                {isCreateMode ? (
                    <CreateBeerForm onCreate={handleCreate} onClose={handleModalClose}/>
                ) : (
                    <CreateBeerForm onCreate={handleCreate} onClose={handleModalClose}  />

                    // <UpdateForm initialData={selectedBeer!} onSubmit={handleUpdate} />
                )}
            </Modal>
            <BeerList
                beers={beers}
                onDelete={handleDelete}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
            />
        </div>
    );
};

export default BeersPage;