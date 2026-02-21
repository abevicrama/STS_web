/**
 * alumniAuth.js
 * Auth helpers backed by alumniAccounts.json (read-only seed data).
 * Profile overrides are stored per-user in localStorage.
 * Session is stored in sessionStorage.
 */
import seedAccounts from './alumniAccounts.json';

const SESSION_KEY = 'sts_alumni_session';   // sessionStorage: logged-in email
const PROFILE_KEY = 'sts_alumni_profiles';  // localStorage:   { [email]: overrides }

/* ---- helpers ---- */
const getProfiles = () => JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}');
const saveProfiles = profiles => localStorage.setItem(PROFILE_KEY, JSON.stringify(profiles));

/** Merge seed account with any saved overrides */
const mergeProfile = account => {
    const overrides = getProfiles()[account.email] || {};
    return { ...account, ...overrides };
};

/* ---- public API ---- */

/** Login: check email + password against seed data AND localStorage-registered accounts */
export const loginAlumnus = (email, password) => {
    const normalEmail = email.trim().toLowerCase();

    // Check seed accounts first
    let account = seedAccounts.find(
        a => a.email.toLowerCase() === normalEmail && a.password === password
    );

    // Check localStorage-registered users
    if (!account) {
        const regs = JSON.parse(localStorage.getItem('sts_alumni_reg') || '[]');
        const reg = regs.find(r => r.email.toLowerCase() === normalEmail && r.password === password);
        if (reg) {
            const profiles = getProfiles();
            account = profiles[reg.email] || { email: reg.email };
        }
    }

    if (!account) return { success: false, error: 'Invalid email or password.' };
    sessionStorage.setItem(SESSION_KEY, account.email);
    return { success: true, profile: mergeProfile(account) };
};

/** Returns the currently logged-in profile, or null */
export const getSession = () => {
    const email = sessionStorage.getItem(SESSION_KEY);
    if (!email) return null;
    const account = seedAccounts.find(a => a.email === email);
    if (!account) return null;
    return mergeProfile(account);
};

/** Persist profile changes in localStorage */
export const updateProfile = (updatedFields) => {
    const email = sessionStorage.getItem(SESSION_KEY);
    if (!email) return false;
    const profiles = getProfiles();
    profiles[email] = { ...(profiles[email] || {}), ...updatedFields };
    saveProfiles(profiles);
    return true;
};

/** Log out */
export const logoutAlumnus = () => sessionStorage.removeItem(SESSION_KEY);
