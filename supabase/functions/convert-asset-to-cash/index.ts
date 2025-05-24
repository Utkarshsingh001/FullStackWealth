import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { asset_id, liquidated_value, user_id } = await req.json();

    // Get the asset
    const { data: asset, error: assetError } = await supabaseClient
      .from('assets')
      .select('*')
      .eq('id', asset_id)
      .single();

    if (assetError) throw assetError;

    // Find or create bank account
    const { data: bankAccounts, error: bankError } = await supabaseClient
      .from('assets')
      .select('*')
      .eq('type', 'Bank Account')
      .eq('user_id', user_id);

    if (bankError) throw bankError;

    let bankAccount = bankAccounts[0];

    if (!bankAccount) {
      const { data: newBank, error: createError } = await supabaseClient
        .from('assets')
        .insert([{
          user_id,
          name: 'Primary Bank Account',
          type: 'Bank Account',
          value: 0,
        }])
        .select()
        .single();

      if (createError) throw createError;
      bankAccount = newBank;
    }

    // Update bank account value
    const { error: updateBankError } = await supabaseClient
      .from('assets')
      .update({
        value: bankAccount.value + liquidated_value,
      })
      .eq('id', bankAccount.id);

    if (updateBankError) throw updateBankError;

    // Mark asset as liquidated
    const { error: updateAssetError } = await supabaseClient
      .from('assets')
      .update({
        is_liquidated: true,
        liquidated_value,
        liquidated_date: new Date().toISOString(),
      })
      .eq('id', asset_id);

    if (updateAssetError) throw updateAssetError;

    // Create transaction records
    const { error: transactionError } = await supabaseClient
      .from('asset_transactions')
      .insert([
        {
          asset_id,
          user_id,
          type: 'liquidation',
          amount: liquidated_value,
          notes: `Asset liquidated and transferred to bank account`,
        },
        {
          asset_id: bankAccount.id,
          user_id,
          type: 'deposit',
          amount: liquidated_value,
          notes: `Received from liquidated asset: ${asset.name}`,
        },
      ]);

    if (transactionError) throw transactionError;

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    );
  }
});