import { supabase, toCents, fromCents, handleError } from '../lib/supabase';

export const assetService = {
  async getAssets() {
    try {
      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Convert cents to currency amounts
      return data.map(asset => ({
        ...asset,
        value: fromCents(asset.value),
        monthlySip: fromCents(asset.monthly_sip),
        totalInvested: fromCents(asset.total_invested),
        buyPrice: fromCents(asset.buy_price),
        currentPrice: fromCents(asset.current_price),
        goldBuyPrice: fromCents(asset.gold_buy_price),
        goldCurrentPrice: fromCents(asset.gold_current_price),
        purchasePrice: fromCents(asset.purchase_price),
        marketValue: fromCents(asset.market_value),
        rentalIncome: fromCents(asset.rental_income),
        cryptoBuyPrice: fromCents(asset.crypto_buy_price),
        cryptoCurrentPrice: fromCents(asset.crypto_current_price),
        liquidatedValue: fromCents(asset.liquidated_value),
      }));
    } catch (error) {
      handleError(error);
    }
  },

  async addAsset(asset) {
    try {
      const { data, error } = await supabase
        .from('assets')
        .insert([{
          ...asset,
          value: toCents(asset.value),
          monthly_sip: toCents(asset.monthlySip),
          total_invested: toCents(asset.totalInvested),
          buy_price: toCents(asset.buyPrice),
          current_price: toCents(asset.currentPrice),
          gold_buy_price: toCents(asset.goldBuyPrice),
          gold_current_price: toCents(asset.goldCurrentPrice),
          purchase_price: toCents(asset.purchasePrice),
          market_value: toCents(asset.marketValue),
          rental_income: toCents(asset.rentalIncome),
          crypto_buy_price: toCents(asset.cryptoBuyPrice),
          crypto_current_price: toCents(asset.cryptoCurrentPrice),
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      handleError(error);
    }
  },

  async updateAsset(id, updates) {
    try {
      const { data, error } = await supabase
        .from('assets')
        .update({
          ...updates,
          value: toCents(updates.value),
          monthly_sip: toCents(updates.monthlySip),
          total_invested: toCents(updates.totalInvested),
          buy_price: toCents(updates.buyPrice),
          current_price: toCents(updates.currentPrice),
          gold_buy_price: toCents(updates.goldBuyPrice),
          gold_current_price: toCents(updates.goldCurrentPrice),
          purchase_price: toCents(updates.purchasePrice),
          market_value: toCents(updates.marketValue),
          rental_income: toCents(updates.rentalIncome),
          crypto_buy_price: toCents(updates.cryptoBuyPrice),
          crypto_current_price: toCents(updates.cryptoCurrentPrice),
          updated_at: new Date(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      handleError(error);
    }
  },

  async deleteAsset(id) {
    try {
      const { error } = await supabase
        .from('assets')
        .update({ deleted_at: new Date() })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      handleError(error);
    }
  },

  async convertToCash(id, currentValue) {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      // Start a transaction
      const { data, error } = await supabase.rpc('convert_asset_to_cash', {
        p_asset_id: id,
        p_liquidated_value: toCents(currentValue),
        p_user_id: user.id,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      handleError(error);
    }
  },
};