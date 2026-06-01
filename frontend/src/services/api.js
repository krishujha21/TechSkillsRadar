// filepath: TechSkillsRadar/frontend/src/services/api.js
/**
 * Centralized Axios instance and API service functions
 * for communicating with the TechSkillsRadar FastAPI backend.
 */

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Fetch high-level dataset statistics.
 * @returns {Promise<{total_jobs, skills_tracked, most_demanded_skill, avg_salary}>}
 */
export const fetchStats = async () => {
  const { data } = await api.get("/analytics/stats");
  return data;
};

/**
 * Fetch top 10 skills by frequency.
 * @returns {Promise<Array<{skill: string, count: number}>>}
 */
export const fetchSkills = async () => {
  const { data } = await api.get("/analytics/skills");
  return data;
};

/**
 * Fetch job count per role.
 * @returns {Promise<Array<{role: string, count: number}>>}
 */
export const fetchRoles = async () => {
  const { data } = await api.get("/analytics/roles");
  return data;
};

/**
 * Fetch job count per location.
 * @returns {Promise<Array<{location: string, count: number}>>}
 */
export const fetchLocations = async () => {
  const { data } = await api.get("/analytics/locations");
  return data;
};

/**
 * Fetch average salary per role.
 * @returns {Promise<Array<{role: string, avg_salary: number}>>}
 */
export const fetchSalary = async () => {
  const { data } = await api.get("/analytics/salary");
  return data;
};

/**
 * Search jobs with optional filters and pagination.
 * @param {Object} params - { role, location, skill, page, limit }
 * @returns {Promise<{jobs: Array, total: number, page: number, limit: number, total_pages: number}>}
 */
export const searchJobs = async (params = {}) => {
  const { data } = await api.get("/analytics/search", { params });
  return data;
};

export default api;