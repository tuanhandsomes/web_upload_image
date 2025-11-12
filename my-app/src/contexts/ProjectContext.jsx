// src/contexts/ProjectContext.jsx
import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const [selectedProject, setSelectedProject] = useLocalStorage('selectedProject', null);

    const selectProject = (project) => {
        setSelectedProject(project);
    };

    const clearSelectedProject = () => {
        setSelectedProject(null);
    };

    return (
        <ProjectContext.Provider value={{ selectedProject, selectProject, clearSelectedProject }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProject = () => useContext(ProjectContext);